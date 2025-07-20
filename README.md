# TrendPulse-AI-Predictive-Retail-Intelligence-for-Walmart-s-Next-Gen-Supply-Chain

![alt text](https://img.shields.io/badge/Walmart-Sparkathon-blue.svg)
![alt text](https://img.shields.io/badge/status-complete-success.svg)

An AI engine that analyzes live Google Trends to predict viral product demand and automate intelligent inventory decisions for Walmart’s next-gen supply chain.

## 💡 The Problem: Supply Chain Lag

In today's market, demand is driven by unpredictable viral trends. Traditional inventory systems are reactive, relying on historical sales data. This creates a critical supply chain lag, leaving Walmart one step behind the customer. By the time a product's popularity is confirmed by sales reports, the initial demand spike has passed, leading to:

- Stock-Outs on the hottest items.
- Missed Revenue and frustrated customers.
- Inefficient Capital tied up in overstocked, fading trends.

## 🚀 The Solution: Predictive Intelligence

TrendPulse AI transforms Walmart's inventory management from reactive to proactive. It closes the supply chain lag by quantifying a product's "viral momentum" before it results in a stock-out.

Our engine fuses internal sales data with live, external Google Trends data to generate a proprietary "Viral Score". This score predicts future demand and triggers our automated Decision Engine, which then recommends the smartest logistical action—all before the competition can even react.

## 📸 Application Snapshots

(Replace these placeholders with your actual screenshots of the application)

**Main Dashboard (Ranked Alerts)** | **Critical Analysis (Transfer Rec)** | **Gemini AI Opportunity Analysis**  
[Screenshot of the dashboard] | [Screenshot of the map view] | [Screenshot of the Gemini response]

## ✨ Key Features

- **Proprietary "Viral Score" AI**: A unique algorithm combining Trend Velocity and Sales Momentum into a single, powerful metric to rank at-risk products.

- **Automated Decision Engine**: The system intelligently chooses between two actions:
  - **Smart Inter-Store Transfers**: Automatically finds the nearest store with a healthy surplus to transfer stock, optimizing logistics and using existing assets first.
  - **Manufacturer Replenishment**: When no suitable surplus is found, it smartly defaults to recommending a purchase order from the Distribution Center.

- **Live Gemini AI Opportunity Analysis**: Detects emerging trends for products Walmart doesn't even stock yet. With one click, it uses Google's Generative AI to provide a live market analysis, classifying the opportunity and suggesting a strategic course of action.

- **Dynamic International Simulation**: The backend runs a "digital twin" of a global store network, proving the model's scalability and providing a rich, dynamic environment for data generation.

- **Interactive Dashboard & Visualization**: A polished frontend built with React, featuring a ranked alert dashboard, predictive graphs, and an interactive map that visualizes the recommended stock transfer routes.

## 🛠️ Tech Stack & Architecture

The project follows a modern, decoupled architecture with a Python backend serving a React frontend.

**System Flow:**  
Frontend (React) ↔ Backend API (FastAPI) ↔ External Services (Google Trends, Gemini AI)

| Category   | Technology |
|------------|------------|
| Backend    | Python, FastAPI, Pytrends (for Google Trends data), Google Generative AI (Gemini Pro), Pandas, Haversine |
| Frontend   | React (Vite), Material-UI (MUI), MapLibre GL (for interactive maps), Recharts (for data viz), Framer Motion |
| Dev Tools  | Uvicorn, Git, Visual Studio Code |

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- Python 3.9 or later & pip
- Git

## 🔑 Environment Variables

You will need to create two `.env` files to store your API keys.

**Backend:** In the `backend/` folder, create a `.env` file:
```

GEMINI\_API\_KEY="YOUR\_GOOGLE\_AI\_GEMINI\_API\_KEY"

```

**Frontend:** In the `frontend/` folder, create a `.env` file:
```

VITE\_MAPTILER\_API\_KEY="YOUR\_MAPTILER\_API\_KEY"

````

## ⚙️ Installation & Running the App

**Clone the repository:**
```sh
git clone https://your-repository-url.com
cd your-project-folder
````

**Setup the Backend:**

```sh
cd backend
python -m venv myenv
source myenv/bin/activate  # On Windows, use `myenv\Scripts\activate`
pip install -r requirements.txt
uvicorn main:app --reload
```

The backend will start on `http://localhost:8000`.

**Setup the Frontend (in a new terminal):**

```sh
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

Open your browser and navigate to `http://localhost:5173` to use the application.

## 📝 API Endpoints

The backend provides a simple and powerful API.

| Method | Endpoint               | Description                                                                      |
| ------ | ---------------------- | -------------------------------------------------------------------------------- |
| POST   | `/api/simulate`        | Runs one step of the simulation and returns a list of ranked, actionable alerts. |
| POST   | `/api/gemini_analysis` | Takes a product name and keywords, returns a live AI-powered market analysis.    |

---

**Built with ❤️ for the Walmart Sparkathon 2025.**
