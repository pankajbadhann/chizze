# Contributing to Chizze

First of all, thank you for considering contributing to Chizze.

This project is an attempt to build a new category of software:

> Context Intelligence Systems

We appreciate contributions of all sizes, from typo fixes to major architectural improvements.

---

# Before You Contribute

Please read the following documents first:

1. 01-overview.md
2. 10-product-thesis.md
3. 08-domain-model.md
4. 03-architecture.md

Understanding the product philosophy is more important than understanding the codebase.

---

# Product-First Development

Chizze is not a feature-driven project.

It is a thesis-driven project.

Before proposing a feature, ask:

- Does it preserve context?
- Does it improve clarity?
- Does it strengthen execution?
- Does it align with the product thesis?

If the answer is "no" to most of these questions, the feature likely does not belong in Chizze.

---

# Ways to Contribute

## Product Contributions

Examples:

- domain improvements
- workflow design
- feature proposals
- UX discussions
- product research

---

## Frontend Contributions

Examples:

- accessibility improvements
- dashboard experiences
- visualization systems
- design consistency

---

## Backend Contributions

Examples:

- API improvements
- service architecture
- database optimization
- performance enhancements

---

## Infrastructure Contributions

Examples:

- CI/CD pipelines
- monitoring
- deployment automation
- observability

---

## Documentation Contributions

Examples:

- clarification
- onboarding improvements
- architectural explanations
- diagrams

---

# Contribution Workflow

## Step 1

Fork the repository.

---

## Step 2

Create a branch.

Format:

```bash
feature/<name>
```

Examples:

```bash
feature/context-analysis

feature/intent-search

feature/dashboard-redesign
```

---

## Step 3

Implement changes.

---

## Step 4

Test changes locally.

---

## Step 5

Open Pull Request.

---

# Pull Request Guidelines

A pull request should answer:

### What changed?

Describe the modification.

---

### Why was it needed?

Explain the problem being solved.

---

### How was it implemented?

Provide technical details.

---

### Are there breaking changes?

Document migration requirements if applicable.

---

# Commit Convention

Use Conventional Commits.

---

## Feature

```bash
feat: add intent search endpoint
```

---

## Fix

```bash
fix: resolve socket room synchronization issue
```

---

## Refactor

```bash
refactor: simplify analysis service
```

---

## Documentation

```bash
docs: update product thesis
```

---

## Test

```bash
test: add authentication integration tests
```

---

# Engineering Principles

## 1. Thin Controllers

Controllers should coordinate requests.

They should not contain business logic.

---

## 2. Service Ownership

Business logic belongs inside services.

---

## 3. Repository Isolation

Database access should be isolated from business rules.

---

## 4. Explicit Domain Language

Prefer:

```text
Intent
Context
Analysis
Action
```

over generic terms like:

```text
Item
Data
Record
Object
```

The domain language matters.

---

# Code Review Principles

Code review is not only about correctness.

Reviewers should evaluate:

- maintainability
- clarity
- domain alignment
- architectural consistency

---

# Documentation Expectations

Major changes should include documentation updates.

Examples:

- new modules
- new APIs
- architectural changes
- domain changes

---

# Design Principles

When introducing a new capability:

Prefer:

```text
Simple
Composable
Extensible
```

Avoid:

```text
Complex
Tightly Coupled
Prematurely Abstract
```

---

# Feature Evaluation Framework

Before implementing a feature, ask:

### Does it preserve context?

---

### Does it create meaningful intelligence?

---

### Does it help execution?

---

### Does it increase system complexity?

If complexity increases significantly, provide justification.

---

# What We Are Not Building

To keep the product focused, Chizze intentionally avoids becoming:

- social media platform
- chat application replacement
- task manager clone
- note-taking clone
- productivity dashboard clone

---

# Architecture Expectations

Current architecture is:

```text
Controller
↓
Service
↓
Repository
↓
Database
```

New contributions should respect this structure.

---

# Testing Expectations

When possible, include:

### Backend

- unit tests
- integration tests

---

### Frontend

- component tests
- interaction tests

---

# Reporting Issues

When creating an issue, include:

## Problem

What is happening?

---

## Expected Behavior

What should happen?

---

## Reproduction Steps

How can it be reproduced?

---

## Environment

Operating system

Node version

Database version

Browser (if applicable)

---

# Decision Making

Large architectural changes should be discussed before implementation.

Examples:

- database changes
- major dependencies
- authentication changes
- infrastructure changes

---

# Maintainer Philosophy

The goal of Chizze is not to collect features.

The goal is to build a coherent system that understands and activates human intent.

A smaller, focused product is preferable to a larger, unfocused one.

---

# Community Standards

Be respectful.

Assume positive intent.

Discuss ideas openly.

Critique implementations, not people.

---

# Recognition

All meaningful contributions are valuable.

Whether you:

- fix a typo
- improve documentation
- optimize a query
- design a new system

you are helping shape the future of Chizze.

Thank you for contributing.