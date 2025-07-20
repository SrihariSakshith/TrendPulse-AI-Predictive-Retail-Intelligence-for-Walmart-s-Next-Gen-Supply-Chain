# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from simulation_engine import SimulationEngine
import json
from pydantic import BaseModel
from typing import List

# --- Pydantic Models for Request Validation & API Docs ---
class GeminiRequest(BaseModel):
    product_name: str
    keywords: List[str]

# --- App Initialization ---
app = FastAPI(
    title="Walmart Demand-Flow Engine API",
    description="This API runs market simulations and provides AI-driven inventory recommendations.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # The default Vite dev server port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Singleton Simulation Engine Instance ---
# This ensures that the engine's state (inventory, trend history) is maintained across API calls.
sim_engine = SimulationEngine()
print("✅ Simulation Engine Initialized.")

# --- API Endpoints ---
@app.post("/api/simulate", tags=["Simulation"])
async def run_simulation():
    """
    Runs a single simulation step (simulating one day).
    This generates new sales, updates trends, and runs the decision engine
    to create critical stock alerts with intelligent recommendations.
    """
    alerts = sim_engine.run_simulation_step()
    return {"alerts": alerts}

@app.post("/api/gemini_analysis", tags=["AI Analysis"])
async def analyze_with_gemini(request: GeminiRequest):
    """
    Gets a live, AI-driven market analysis for a new product trend
    using Google's Gemini Pro model.
    """
    # The Pydantic model has already validated the request body.
    analysis_str = sim_engine.get_gemini_analysis(request.product_name, request.keywords)
    try:
        # The Gemini response is a JSON string, so we parse it before sending.
        analysis_json = json.loads(analysis_str)
        return analysis_json
    except json.JSONDecodeError:
        # If Gemini returns a malformed response, we raise a proper HTTP exception.
        print(f"🔴 ERROR: Gemini returned a non-JSON response: {analysis_str}")
        raise HTTPException(
            status_code=502, # Bad Gateway
            detail={"error": "The AI service returned an invalid response.", "raw_text": analysis_str}
        )
    except Exception as e:
        # Catch any other unexpected errors during the process.
        print(f"🔴 ERROR: An unexpected error occurred during Gemini analysis: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred while contacting the AI service.")

@app.on_event("startup")
async def startup_event():
    # Pre-fetch initial trends on server startup to make the first simulation faster.
    print("🚀 Server starting up. Pre-fetching initial trend data...")
    sim_engine.trend_history = sim_engine._fetch_initial_trends_robust()
    print("✅ Initial trend data fetched. Server is ready.")