# Power Outage Prediction & Grid Equipment Failure Advisor

> Intelligent real-time power outage risk prediction and predictive electrical grid equipment maintenance advisor.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, JavaScript, CSS3
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy (Async), asyncpg, Uvicorn
- **Database**: Supabase (PostgreSQL)
- **Infrastructure**: Docker & Docker Compose

---

## 📁 Repository Structure

```
ibm/
├── backend/
│   ├── .env.example
│   ├── database.py       # Async SQLAlchemy connection engine
│   ├── models.py         # TestItem & Grid telemetric database models
│   ├── main.py           # FastAPI app entrypoint (/health and advisor APIs)
│   ├── requirements.txt  # Python package dependencies
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main dashboard layout with /health integration
│   │   ├── main.jsx      # React entrypoint
│   │   └── index.css     # Modern responsive grid theme styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js    # Vite proxy config for backend routing
│   └── Dockerfile
├── infra/
│   └── docker-compose.yml # Compose config for db, api, and web services
└── docs/
    └── README.md         # Setup and architecture guide
```

---

## 🚀 Setup & Execution Guide

### 1. Setting Up Supabase & `DATABASE_URL`

1. Sign up / Log in to [Supabase](https://supabase.com/).
2. Create a new project (e.g. `grid-equipment-advisor`).
3. Navigate to **Project Settings** > **Database** > **Connection string**.
4. Select the **URI** tab or **Session pooler** tab:
   - Format: `postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`
   - *(Note: Ensure the prefix is `postgresql+asyncpg://` for async database calls)*.
5. In Supabase's **SQL Editor**, you can optionally run table setup scripts or let FastAPI auto-generate tables on startup via `Base.metadata.create_all`.

---

### 2. Running Backend Locally

1. Open a terminal and navigate to `/backend`:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file with your connection string:
   ```bash
   cp .env.example .env
   # Edit .env and set your DATABASE_URL
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
6. Verify at:
   - **Health Endpoint**: [http://localhost:8000/health](http://localhost:8000/health)
   - **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. Running Frontend Locally

1. Open a new terminal and navigate to `/frontend`:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser. The app will immediately poll `/health` and display real-time grid metrics and outage predictions.

---

### 4. Running via Docker (Optional)

To start all services using Docker Compose:
```bash
cd infra
docker compose up --build
```
