# Chizze API Specification

## Overview

The Chizze API is a REST-based service layer responsible for managing:

- Authentication
- Users
- Intents
- Context
- Analysis
- Conversations
- Future intelligence services

All APIs follow a consistent response contract and versioning strategy.

---

# Base URL

Development:

```text
http://localhost:5000/api/v1
```

Production:

```text
https://api.chizze.com/api/v1
```

---

# Authentication

Protected routes require:

```http
Authorization: Bearer <token>
```

---

# Response Standard

## Success Response

```json
{
  "success": true,
  "data": {}
}
```

---

## Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# API Versioning

Current:

```text
v1
```

Future:

```text
v2
v3
```

Versioning is URL-based.

Example:

```text
/api/v1/intents
```

---

# AUTH MODULE

## Register User

### Endpoint

```http
POST /auth/register
```

### Request

```json
{
  "name": "Pankaj",
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

---

## Login User

### Endpoint

```http
POST /auth/login
```

### Request

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "jwt_token"
  }
}
```

---

## Current User

### Endpoint

```http
GET /auth/me
```

### Auth Required

Yes

---

# USER MODULE

## Get User Profile

### Endpoint

```http
GET /users/profile
```

---

## Update User Profile

### Endpoint

```http
PATCH /users/profile
```

### Request

```json
{
  "name": "Updated Name"
}
```

---

# INTENT MODULE

## Purpose

Intent is the primary business object within Chizze.

An intent represents:

- goal
- idea
- decision
- conversation
- initiative

---

## Create Intent

### Endpoint

```http
POST /intents
```

### Request

```json
{
  "title": "Launch startup",
  "description": "Build MVP in 90 days",
  "type": "goal"
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "intent_id"
  }
}
```

---

## Get All Intents

### Endpoint

```http
GET /intents
```

### Query Parameters

```text
?page=1
&limit=20
&status=active
```

---

## Get Intent By ID

### Endpoint

```http
GET /intents/:id
```

---

## Update Intent

### Endpoint

```http
PATCH /intents/:id
```

---

## Delete Intent

### Endpoint

```http
DELETE /intents/:id
```

---

# CONTEXT MODULE

## Purpose

Context provides supporting information around an intent.

Examples:

- conversation excerpts
- notes
- observations
- external references

---

## Add Context

### Endpoint

```http
POST /intents/:id/context
```

### Request

```json
{
  "content": "Discussion with potential co-founder",
  "source": "manual"
}
```

---

## Fetch Context

### Endpoint

```http
GET /intents/:id/context
```

---

# ANALYSIS MODULE

## Purpose

Transforms context into structured intelligence.

---

## Generate Analysis

### Endpoint

```http
POST /analysis/:intentId
```

### Response

```json
{
  "success": true,
  "data": {
    "summary": "Startup idea identified",
    "executionGap": "No validation completed",
    "nextAction": "Interview 5 potential users"
  }
}
```

---

## Get Analysis

### Endpoint

```http
GET /analysis/:intentId
```

---

# CONVERSATION MODULE

## Purpose

Stores meaningful communication associated with an intent.

---

## Create Conversation

### Endpoint

```http
POST /conversations
```

### Request

```json
{
  "title": "Startup Planning Discussion"
}
```

---

## Add Message

### Endpoint

```http
POST /conversations/:id/messages
```

### Request

```json
{
  "content": "We should validate before building."
}
```

---

## Fetch Messages

### Endpoint

```http
GET /conversations/:id/messages
```

---

# REAL-TIME EVENTS

## Socket Connection

```text
ws://localhost:5000
```

---

## Events

### Client → Server

```text
join_conversation
leave_conversation
send_message
```

---

### Server → Client

```text
message_received
conversation_updated
analysis_completed
intent_updated
```

---

# SEARCH MODULE (PLANNED)

## Search Intents

```http
GET /search/intents?q=startup
```

---

## Search Conversations

```http
GET /search/conversations?q=funding
```

---

# RATE LIMITING

Future limits:

```text
100 requests / minute
```

Authentication endpoints:

```text
10 requests / minute
```

---

# API SECURITY

All endpoints should enforce:

- Authentication
- Input validation
- Authorization checks
- Rate limiting
- Request logging

---

# API DESIGN PRINCIPLES

## Predictable

Endpoints should behave consistently.

---

## Stateless

Every request contains required context.

---

## Versioned

Breaking changes require version increment.

---

## Observable

Every critical request should be traceable.

---

# Future API Modules

Planned services:

- Recommendation Engine
- Relationship Intelligence
- Behavioral Analytics
- Goal Forecasting
- AI Context Processor

---

# Summary

The API layer exists to expose Chizze's core capability:

Transforming human intent and context into structured execution intelligence.