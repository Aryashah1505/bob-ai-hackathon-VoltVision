# Setup Guide

> **This guide explains how to install, configure, and run PRAVAHA locally.**

## Prerequisites

Before you begin, make sure the following are installed or available:

* **Python 3** — used to run the FastAPI backend and risk-analysis logic.
* **Node.js and npm** — used to run the React + Vite frontend.
* **Git** — used to clone the PRAVAHA repository.
* **Supabase project** — used to store PRAVAHA data in PostgreSQL.
* **IBM watsonx.ai access** — required for the IBM AI-powered risk prediction functionality used by PRAVAHA.
* **IBM Bob** — used during the development of the PRAVAHA solution.

## Environment Variables

PRAVAHA uses environment variables to connect securely to the database and IBM services.

Create your local environment file:

```bash
cp .env.example .env
```

Then open `.env` and add the values for your environment.

| Variable             | Description                                            | Required |
| -------------------- | ------------------------------------------------------ | -------- |
| `DATABASE_URL`       | Connection string for the Supabase PostgreSQL database | Yes      |
| `SUPABASE_URL`       | URL of the Supabase project                            | Yes      |
| `SUPABASE_ANON_KEY`  | Supabase API key used by the application               | Yes      |
| `WATSONX_API_KEY`    | IBM watsonx.ai API key used for AI/ML operations       | Yes      |
| `WATSONX_PROJECT_ID` | IBM watsonx.ai project ID                              | Yes      |

> **Important:** Never upload `.env` to GitHub. It may contain private database credentials and IBM API keys.

## Installation

### 1. Clone the repository

Download the PRAVAHA project:

```bash
git clone https://github.com/Aryashah1505/bob-ai-hackathon-VoltVision.git
cd bob-ai-hackathon-VoltVision
```

### 2. Install backend dependencies

Move to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate the environment:

```bash
source .venv/bin/activate
```

Install the backend packages:

```bash
pip install -r requirements.txt
```

### 3. Install frontend dependencies

Open a second terminal and move to the frontend:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

### 4. Configure the database and IBM services

Create the environment file:

```bash
cp .env.example .env
```

Add:

```text
Supabase connection details
+
IBM watsonx.ai API details
```

PRAVAHA uses Supabase PostgreSQL for application data and IBM watsonx.ai for the AI-powered risk prediction workflow.

## Running the Application

PRAVAHA has two main application layers:

```text
User
  ↓
React + Vite Frontend
  ↓
FastAPI Backend
  ↓
Supabase PostgreSQL
  +
IBM watsonx.ai
  ↓
Risk Analysis
  ↓
PRAVAHA Dashboard
```

Both frontend and backend services should be running.

### Start the backend

From the `backend` directory:

```bash
source .venv/bin/activate
uvicorn main:app --reload
```

The backend normally runs at:

```text
http://127.0.0.1:8000
```

### Start the frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The frontend normally runs at:

```text
http://localhost:5173
```

Open the frontend address in your browser.

## Running Tests

Run the available automated tests with:

```bash
pytest
```

For a basic application check, verify the following flow:

```text
PRAVAHA Opens
      ↓
Dashboard Loads
      ↓
Database Data Appears
      ↓
Assets Are Displayed
      ↓
Asset Risk Is Calculated
      ↓
IBM AI Risk Processing Works
      ↓
Alerts Are Displayed
      ↓
Maintenance Recommendations Appear
```

## Quick Demo (Optional)

After starting the frontend and backend:

```text
1. Open http://localhost:5173
2. Open the PRAVAHA dashboard
3. Enter or select the company and region
4. View substations and transformers
5. View sensor and weather data
6. Run the risk analysis
7. View the asset-specific risk score
8. Check possible failures and alerts
9. View maintenance recommendations
10. Review crew pre-positioning suggestions
```

The main PRAVAHA workflow is:

```text
Asset Data
    ↓
Supabase Database
    ↓
FastAPI Backend
    ↓
IBM watsonx.ai / Risk Analysis
    ↓
Asset Risk Score
    ↓
Alert
    ↓
Recommended Action
```

## Troubleshooting

| Issue                                | Solution                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `ModuleNotFoundError`                | Activate `.venv` and run `pip install -r requirements.txt` again.                                             |
| `npm` or package error               | Run `npm install` inside the `frontend` directory again.                                                      |
| Frontend does not open               | Make sure `npm run dev` is running and use the URL displayed by Vite.                                         |
| Frontend cannot connect to backend   | Make sure FastAPI is running and the frontend is configured with the correct backend URL.                     |
| Database shows no data               | Check `DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, database tables, and Row Level Security policies.  |
| CORS error                           | Check the FastAPI CORS configuration and make sure the frontend origin is allowed.                            |
| IBM watsonx.ai `401` error           | Check `WATSONX_API_KEY` and `WATSONX_PROJECT_ID` in `.env`.                                                   |
| IBM watsonx.ai connection error      | Verify that the IBM project is active and the configured API credentials have access to the required service. |
| Risk prediction does not work        | Check the backend terminal for ML/API errors and verify the required IBM and database environment variables.  |
| Port already in use                  | Stop the application using that port or run the service on another available port.                            |
| Environment variables are not loaded | Confirm that `.env` is configured correctly and restart the backend after making changes.                     |
