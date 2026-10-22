# EquiFlow | Full-Stack Personal Finance & Expense Splitting Platform

EquiFlow is a production-grade full-stack personal finance and group expense splitting platform designed to handle multi-currency balances, automated debt simplification algorithms, and real-time notifications for group expenses.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, REST APIs
- **Database:** PostgreSQL

## Demo Walkthrough

This project is a strong student project because it combines a real-world problem with a modern full-stack setup.

A sample demo flow could be:

1. Log in to the dashboard.
2. Add group members and split an expense.
3. View the balances and simplified debts.
4. See who owes who after the algorithm runs.
5. Check the real-time updates on the dashboard.

## Architecture Overview

```text
Frontend (React/Vite)
        |
        v
REST API / Express Server
        |
        +--> Authentication
        +--> Expense logic
        +--> Split calculation
        +--> Balance aggregation
        |
        v
Database (PostgreSQL)
```

## What This Project Teaches

- Full-stack app structure
- UI design and dashboard thinking
- Expense logic and balance calculation
- API-driven data flow
- Backend persistence and database design

## Deployment Notes

This app is ideal for deployment using a modern frontend hosting platform like Vercel with a Node.js backend service or Docker deployment.

Suggested approach:

- host the frontend on Vercel or Netlify
- deploy the API on Render or Railway
- set environment variables for database access
- use PostgreSQL for persistent data

## Student Notes

This project feels like a real product because it solves a practical day-to-day problem and has a clear user flow. It is a highly relevant example of how a student can turn a common problem into a system with API, database, and UI design.

## Possible Next Improvements

- Add authentication and user accounts
- Add recurring expenses and budgets
- Add export options for statements
- Add notifications and reminders
- Add analytics charts and reporting
