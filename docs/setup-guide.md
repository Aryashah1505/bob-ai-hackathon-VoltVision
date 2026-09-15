# Setup Guide

> **This guide explains how to install and run PRAVAHA on a local computer.**

## Prerequisites

Before you begin, make sure the following are installed:

* **Python 3** — used to run the backend.
* **Node.js and npm** — used to run the React frontend.
* **Git** — used to download the project from GitHub.
* **A Supabase project** — used by PRAVAHA to store application data.

## Environment Variables

PRAVAHA uses environment variables to connect to the database and other services.

First, create your local environment file:

```bash
cp .env.example .env
```

Then open the `.env` file and add the values required by your project.

| Variable             | Description                                                | Required |
| -------------------- | ---------------------------------------------------------- | -------- |
| `DATABASE_URL`       | Connection string for the Supabase PostgreSQL database     | Yes      |
| `SUPABASE_URL`       | URL of the Supabase project                                | Yes      |
| `SUPABASE_ANON_KEY`  | Supabase key used by the application                       | Yes      |
| `WATSONX_API_KEY`    | IBM watsonx.ai API key, when the integration is enabled    | No       |
| `WATSONX_PROJECT_ID` | IBM watsonx.ai project ID, when the integration is enabled | No       |

> **Important:** Never upload `.env` to GitHub because it may contain private keys or passwords.

## Installation

### 1. Clone the repository

Download the PRAVAHA project from GitHub:

```bash
git clone https://github.com/Aryashah1505/bob-ai-hackathon-VoltVision.git
cd bob-ai-hackathon-VoltVision
```

### 2. Install backend dependencies

Move into the backend folder:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 3. Install frontend dependencies

Open a **new terminal** and move into the frontend folder:

```bash
cd frontend
```

Install the required JavaScript packages:

```bash
npm install
```

### 4. Set up the database

PRAVAHA uses **Supabase PostgreSQL** as its database.

Make sure the Supabase project is configured and the required environment variables have been added to the `.env` file.

## Running the Application

PRAVAHA uses two parts:

```text
Frontend
   ↓
Backend API
   ↓
Supabase Database
```

Both the frontend and backend need to be running.

### Start the backend

From the `backend` folder:

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

Open this address in your browser to use PRAVAHA.

## Running Tests

Run the available project tests using:

```bash
pytest
```

For a basic application check, verify that:

```text
PRAVAHA opens
      ↓
Dashboard loads
      ↓
Database data appears
      ↓
Assets are displayed
      ↓
Asset-wise risk is shown
      ↓
Alerts are displayed
      ↓
Maintenance recommendations are displayed
```

## Quick Demo (Optional)

To quickly demonstrate PRAVAHA after starting the frontend and backend:

```text
1. Open http://localhost:5173
2. Open the PRAVAHA dashboard
3. Select or enter the company and region
4. View substations and transformers
5. View sensor and weather information
6. Check the risk score of each asset
7. Check alerts and possible failures
8. View maintenance recommendations
9. View crew pre-positioning suggestions
```

The main idea of the demo is:

```text
Asset Data
    ↓
Risk Analysis
    ↓
Risk Score
    ↓
Alert
    ↓
Recommended Action
```

## Troubleshooting

| Issue                                 | Solution                                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `ModuleNotFoundError`                 | Activate the `.venv` environment and run `pip install -r requirements.txt` again.            |
| `npm` or package error                | Open the `frontend` folder and run `npm install` again.                                      |
| Frontend does not open                | Make sure `npm run dev` is running and open the URL shown by Vite.                           |
| Frontend cannot connect to backend    | Make sure the FastAPI backend is running at the expected address and port.                   |
| Database shows no data                | Check the Supabase URL, database credentials, table data, and Row Level Security policies.   |
| CORS error                            | Check the backend CORS configuration and make sure the frontend URL is allowed.              |
| watsonx.ai `401` error                | Check `WATSONX_API_KEY` and `WATSONX_PROJECT_ID` if watsonx.ai integration is enabled.       |
| Port already in use                   | Stop the application using that port or start the service on another port.                   |
| Environment variables are not working | Check that `.env` exists in the expected location and restart the backend after changing it. |
