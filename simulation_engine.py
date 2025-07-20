import pandas as pd
from pytrends.request import TrendReq
import random
import math
import google.generativeai as genai
import os
from dotenv import load_dotenv
from data_catalog import STORES, PRODUCTS, OPPORTUNITY_PRODUCTS
from haversine import haversine, Unit
import time
import itertools
import json

# --- Load Environment Variables ---
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# --- Class Definition ---
class SimulationEngine:
    """
    Manages the market simulation, trend analysis, demand prediction,
    and intelligent decision-making for inventory alerts.
    """
    def __init__(self):
        self.inventory = self._get_initial_state()
        self.pytrends = TrendReq(hl='en-US', tz=0)
        self.trend_history = {}
        print("✅ SimulationEngine components initialized for international stores.")

    def _get_initial_state(self):
        """
        Builds an initial inventory state with strategic variance to demonstrate
        both TRANSFER and REPLENISH_FROM_DC scenarios.
        """
        inventory = {}
        # --- STRATEGIC CHANGE FOR DEMO ---
        # Define some products as "not available" or low-stock in the Moscow hub.
        # This will force the "Replenish from DC" logic for these specific items.
        non_russian_market_skus = ["BOAT-XTND", "NOT-P2", "ONE-12"]
        
        for store_id in STORES:
            inventory[store_id] = {}
            for sku, product_info in PRODUCTS.items():
                
                # Moscow (MSK) acts as a distribution hub...
                if store_id == 'MSK':
                    # ...but NOT for the regionally unavailable products.
                    if sku in non_russian_market_skus:
                        initial_stock = random.randint(0, 10) # Very low, cannot act as surplus
                        sales_history = [random.randint(0, 1) for _ in range(7)]
                    else:
                        initial_stock = random.randint(800, 1200) # Hub-level stock for other products
                        sales_history = [random.randint(1, 3) for _ in range(7)]
                # All other "spoke" stores
                else:
                    # Give them a slightly larger buffer to avoid immediate stock-out to zero.
                    initial_stock = random.randint(50, 90)
                    sales_history = [random.randint(5, 15) for _ in range(7)]
                
                current_stock = max(0, initial_stock - sum(sales_history))
                
                inventory[store_id][sku] = {
                    "sku": sku, "name": product_info["name"], "initial_stock": initial_stock,
                    "current_stock": current_stock, "sales_history_7d": sales_history,
                }
        print("✅ Initial inventory state created with nuanced variance to show all recommendation types.")
        return inventory

    def _fetch_initial_trends_robust(self):
        """
        Fetches 7-day trend history for all product keywords using US data as a
        stable proxy for global trends.
        """
        print("--- Fetching Initial 7-Day US Trend History (Robustly)... ---")
        all_keywords = [p['keywords'][0] for p in PRODUCTS.values()]
        trend_history = {}
        
        keyword_chunks = list(itertools.zip_longest(*[iter(all_keywords)] * 5, fillvalue=None))

        for chunk in keyword_chunks:
            current_keywords = [kw for kw in chunk if kw is not None]
            try:
                self.pytrends.build_payload(current_keywords, cat=0, timeframe='today 7-d', geo='US')
                df = self.pytrends.interest_over_time()
                for kw in current_keywords:
                    if kw in df.columns:
                        trend_history[kw] = df[kw].tolist()
                    else:
                        trend_history[kw] = [0] * 7
                print(f"  > Fetched US trends for: {current_keywords}")
            except Exception as e:
                print(f"🔴 Error fetching trend chunk {current_keywords}: {e}. Defaulting to 0.")
                for kw in current_keywords:
                    trend_history[kw] = [0] * 7
            time.sleep(1)
            
        print("--- Initial US Trend Fetch Complete. ---")
        return trend_history

    def _get_viral_score_and_prediction(self, sales_history, trend_history_points):
        """Calculates a 'Viral Score' and predicts future stock needs."""
        if not trend_history_points or len(trend_history_points) < 3: return 0, 0
        
        avg_past_trend = sum(trend_history_points[:-1]) / len(trend_history_points[:-1])
        latest_trend = trend_history_points[-1]
        velocity = (latest_trend - avg_past_trend) if avg_past_trend > 0 else latest_trend

        avg_sales = sum(sales_history) / len(sales_history)
        latest_sales_avg = sum(sales_history[-3:]) / 3
        sales_momentum = (latest_sales_avg - avg_sales) if avg_sales > 0 else latest_sales_avg
        
        viral_score = max(0, round((velocity * 0.7) + (sales_momentum * 0.3), 1))

        avg_daily_sales = max(1, sum(sales_history) / 7)
        base_demand_4_weeks = avg_daily_sales * 28
        viral_buffer = (viral_score / 10) * (avg_daily_sales * 7)
        predicted_stock_need = math.ceil(base_demand_4_weeks + viral_buffer)

        return viral_score, predicted_stock_need

    def distance_km(self, store_id_1, store_id_2):
        """Calculates distance in km between two stores."""
        coord1 = (STORES[store_id_1]['coords'][0], STORES[store_id_1]['coords'][1])
        coord2 = (STORES[store_id_2]['coords'][0], STORES[store_id_2]['coords'][1])
        return haversine(coord1, coord2, unit=Unit.KILOMETERS)

    def decision_engine(self, alerts):
        """Processes critical alerts to generate actionable recommendations."""
        final_alerts = []
        critical_stock_alerts = [a for a in alerts if a['type'] == 'CRITICAL_STOCK']
        
        for alert in critical_stock_alerts:
            sku_in_need = alert['sku']
            deficit_store_id = alert['store_id']
            
            surplus_stores = []
            for store_id, store_inv in self.inventory.items():
                if store_id == deficit_store_id: continue

                product_data = store_inv[sku_in_need]
                kw = PRODUCTS[sku_in_need]['keywords'][0]
                viral_score, predicted_need = self._get_viral_score_and_prediction(
                    product_data['sales_history_7d'], self.trend_history[kw]
                )
                
                if product_data['current_stock'] > (predicted_need * 1.2):
                    surplus_stores.append({
                        "id": store_id, "available_stock": product_data['current_stock'],
                        "distance_km": self.distance_km(deficit_store_id, store_id)
                    })
            
            if surplus_stores:
                nearest_surplus_store = min(surplus_stores, key=lambda x: x['distance_km'])
                alert['recommendation'] = 'INTER_STORE_TRANSFER'
                alert['source_store'] = nearest_surplus_store
            else:
                alert['recommendation'] = 'REPLENISH_FROM_DC'
                alert['source_store'] = None
                
            final_alerts.append(alert)

        final_alerts.extend([a for a in alerts if a['type'] != 'CRITICAL_STOCK'])
        return final_alerts

    def run_simulation_step(self):
        """Runs one day of simulation and returns generated alerts with recommendations."""
        print("\n--- SIMULATING NEXT DAY & RUNNING DECISION ENGINE ---")
        initial_alerts = []

        for store_id, store_inv in self.inventory.items():
            for sku, product_data in store_inv.items():
                kw = PRODUCTS[sku]['keywords'][0]
                if kw not in self.trend_history: continue

                current_trend_points = self.trend_history[kw]
                new_trend_point = max(0, current_trend_points[-1] + random.randint(-5, 10))
                current_trend_points.pop(0)
                current_trend_points.append(new_trend_point)
                
                trend_multiplier = 1 + (current_trend_points[-1] / 100)
                avg_base_sales = sum(product_data['sales_history_7d']) / 7
                new_sales = math.ceil(random.uniform(0.8, 1.2) * avg_base_sales * trend_multiplier)
                
                product_data['current_stock'] = max(3, product_data['current_stock'] - new_sales)
                product_data['sales_history_7d'].pop(0)
                product_data['sales_history_7d'].append(new_sales)

                viral_score, predicted_stock = self._get_viral_score_and_prediction(
                    product_data['sales_history_7d'], current_trend_points
                )
                
                # Alert triggers when stock is less than 1 week of predicted need.
                if predicted_stock > 0 and product_data['current_stock'] < (predicted_stock / 4):
                    initial_alerts.append({
                        "type": "CRITICAL_STOCK", "store_id": store_id, "sku": sku,
                        "product_name": product_data['name'], "viral_score": viral_score,
                        "current_stock": product_data['current_stock'],
                        "predicted_stock_need": predicted_stock,
                        "sales_history": product_data['sales_history_7d'],
                        "trend_history": current_trend_points
                    })

        if random.random() < 0.6:
            opportunity = random.choice(OPPORTUNITY_PRODUCTS)
            initial_alerts.append({
                "type": "NEW_PRODUCT_OPPORTUNITY", "product_name": opportunity['name'],
                "keywords": opportunity['keywords']
            })
        
        final_alerts = self.decision_engine(initial_alerts)
        
        print(f"--- Generated {len(final_alerts)} alerts. ---")
        return final_alerts

    def get_gemini_analysis(self, product_name, keywords):
        """Gets a live market analysis from the Gemini API."""
        print(f"--- Calling Live Gemini API for: {product_name} ---")
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        trend_snippet = "No recent trend data available."
        try:
            self.pytrends.build_payload(keywords, cat=0, timeframe='today 1-m', geo='US')
            trend_df = self.pytrends.interest_over_time()
            if not trend_df.empty:
                trend_snippet = trend_df.tail(7).to_string()
        except Exception as e:
            print(f"Could not fetch trends for {keywords}, proceeding without it. Error: {e}")

        prompt = f"""
        As a senior retail market analyst for Walmart International, evaluate this emerging product.

        Product Name: "{product_name}"
        Recent US Search Trend Data:
        {trend_snippet}

        Based on this data and your knowledge of international consumer markets, provide a concise analysis in a valid JSON object. The JSON object must contain these exact keys: "classification", "reasoning", "target_demographic", "suggested_action".
        - "classification": (String) "High Potential", "Moderate Potential", or "Niche/Risky".
        - "reasoning": (String) A brief explanation for your classification.
        - "target_demographic": (String) The likely primary customer demographic.
        - "suggested_action": (String) A recommended first step for Walmart.
        """

        try:
            response = model.generate_content(prompt)
            json_response = response.text.replace("```json", "").replace("```", "").strip()
            return json_response
        except Exception as e:
            print(f"🔴 Gemini API call failed: {e}")
            return json.dumps({"error": "Failed to get analysis from Gemini API."})