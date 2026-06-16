# Chizze — Development Setup Guide

## Purpose

This document provides the complete setup process required to run Chizze locally for development and testing.

The goal is that any engineer should be able to:

- Clone the repository
- Configure the environment
- Run backend and frontend services
- Connect to the database
- Start contributing

without requiring additional onboarding.

---

# System Requirements

## Recommended Environment

### Operating Systems

- Windows 11
- Ubuntu 22.04+
- macOS 13+

### Runtime

- Node.js 22+
- npm 10+
- PostgreSQL 16+

### Development Tools

- Git
- VS Code
- Postman / Bruno
- Prisma Studio

---

# Repository Structure

```text
chizze/
├── backend/
├── frontend/
├── docs/
└── README.md
```

---

# Backend Setup

Navigate into backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Configuration

Create:

```bash
backend/.env
```

Example:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/chizze"

JWT_SECRET="replace-with-long-secret"

JWT_EXPIRES_IN="7d"

CLIENT_URL="http://localhost:5173"
```

---

# Database Setup

Create database:

```sql
CREATE DATABASE chizze;
```

---

# Prisma Migration

Generate database schema:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Verify database:

```bash
npx prisma studio
```

---

# Start Backend

Development mode:

```bash
npm run dev
```

Expected:

```text
Server running on port 5000
Database connected
Socket server initialized
```

---

# Frontend Setup

Navigate into frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Frontend Environment

Create:

```bash
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

---

# Start Frontend

```bash
npm run dev
```

Expected:

```text
http://localhost:5173
```

---

# Full Local Development

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

---

# Development Workflow

## Create Feature Branch

```bash
git checkout -b feature/intent-analysis
```

---

## Commit Convention

### Features

```bash
git commit -m "feat: add intent analysis service"
```

### Bug Fixes

```bash
git commit -m "fix: resolve socket room synchronization issue"
```

### Documentation

```bash
git commit -m "docs: update architecture documentation"
```

---

# Coding Standards

## Backend

- Business logic belongs in services
- Controllers remain thin
- Repositories handle database access
- No direct Prisma usage in controllers

---

## Frontend

- Reusable UI components
- Avoid duplicated logic
- Centralized API layer
- Context only for global state

---

# Error Handling

All API errors should follow:

```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

---

# Logging

Current:

- Console logging

Future:

- Structured logging
- Request tracing
- Error monitoring

Potential integrations:

- Sentry
- OpenTelemetry
- Grafana

---

# Testing Strategy

Future testing stack:

## Backend

- Jest
- Supertest

## Frontend

- Vitest
- React Testing Library

---

# Security Guidelines

Never commit:

```text
.env
node_modules
database dumps
private keys
access tokens
```

---

# Troubleshooting

## Prisma Client Error

Regenerate:

```bash
npx prisma generate
```

---

## Migration Issues

Reset local database:

```bash
npx prisma migrate reset
```

---

## Port Conflict

Backend:

```env
PORT=5001
```

Frontend:

```bash
npm run dev -- --port 5174
```

---

# Production Deployment (Planned)

Frontend:

- Vercel

Backend:

- Railway
- Render
- Fly.io
- AWS ECS

Database:

- PostgreSQL
- Neon
- Supabase

---

# Maintainer Notes

Before opening a pull request:

1. Pull latest changes
2. Run migrations
3. Verify application starts
4. Verify documentation updates
5. Verify linting passes

---

# Summary

A successful setup should result in:

- Backend running
- Frontend running
- Database connected
- Authentication functional
- Real-time system operational

At this point the contributor is ready to begin development.