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
<p align="center"> <img src="img 1.jpg" alt="Main Dashboard (Ranked Alerts)" width="300"/> <img src="img 2.jpg" alt="Critical Analysis (Transfer Rec)" width="300"/> <img src="img 3.jpg" alt="Gemini AI Opportunity Analysis" width="300"/> </p> <p align="center"> <img src="img 4.jpg" alt="Screenshot 4" width="300"/> <img src="img 5.jpg" alt="Screenshot 5" width="300"/> <img src="img 6.jpg" alt="Screenshot 6" width="300"/> </p> <p align="center"> <img src="img 7.jpg" alt="Screenshot 7" width="300"/> </p>

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

### 📁 File Structure (Markdown Code for README)

Here’s the cleaned-up and ready-to-paste Markdown code:

```markdown
## 📁 Project Structure

### Backend Structure (`backend/`)

The backend is a Python application built with the FastAPI framework.

```

backend/
├── myenv/                  # Python virtual environment (ignored by git)
├── .env                    # Stores the secret GEMINI\_API\_KEY
├── data\_catalog.py         # Defines all store, product, and opportunity data
├── main.py                 # FastAPI application server and API endpoints (e.g., /simulate)
├── requirements.txt        # Lists all Python dependencies (fastapi, pytrends, etc.)
└── simulation\_engine.py    # The core logic for simulation, AI analysis, and decision-making

```

### Frontend Structure (`frontend/`)

The frontend is a modern React application built using Vite.

```

frontend/
├── node\_modules/           # Project dependencies (ignored by git)
├── public/                 # Can hold static assets like a favicon
├── src/
│   ├── components/         # Folder for all reusable React components
│   │   ├── ActionCard.jsx            # Displays the final transfer/replenish action card
│   │   ├── AlertDashboard.jsx        # Main dashboard with ranked critical & opportunity cards
│   │   ├── AnalyticsGraphs.jsx       # Renders the Sales vs. Trend chart
│   │   ├── AnalysisView\.jsx          # Container that switches between analysis types
│   │   ├── CriticalStockAnalysis.jsx # Detailed view for a critical stock alert
│   │   ├── OpportunityAnalysis.jsx   # Detailed view for a new opportunity alert
│   │   ├── Section.jsx               # A reusable styled container component for UI consistency
│   │   └── SolutionMap.jsx           # Renders the interactive map with transfer routes
│   │
│   ├── App.jsx                 # The main application component, state management, and view router
│   ├── data\_catalog\_fe.js      # Frontend's local copy of store data (names, coords) for mapping
│   ├── index.css               # Global CSS styles and animations
│   └── main.jsx                # The entry point of the React application, includes theme setup
│
├── .env                    # Stores the public VITE\_MAPTILER\_API\_KEY
├── index.html              # The root HTML file for this single-page application
├── package.json            # Project metadata, scripts (like `npm run dev`), and dependency list
└── vite.config.js          # Configuration file for the Vite build tool

```

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
