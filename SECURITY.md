# Security Policy

## Supported Versions

Chizze is currently under active development.

Only the latest `main` branch is supported.

| Version | Supported |
|--------|-----------|
| main   | ✅ Yes    |
| older branches | ❌ No |

---

## Reporting a Vulnerability

If you discover a security vulnerability, please do NOT create a public issue.

Instead, report it privately:

- Email: pankajbadhann@gmail.com
- OR GitHub private report (recommended)

---

## What is considered a vulnerability?

We consider the following security issues valid:

- Authentication bypass
- JWT token leakage or misuse
- Unauthorized access to user data
- Database injection (SQL / Prisma misuse)
- XSS / CSRF vulnerabilities
- Socket event manipulation
- Sensitive environment variable exposure

---

## What is NOT considered a vulnerability?

The following are not security issues:

- UI bugs
- Feature requests
- Performance improvements
- Non-critical API failures in development mode

---

## Security Principles

Chizze follows these core security principles:

### 1. Least Privilege

Users can only access their own data unless explicitly shared.

---

### 2. Authentication Required

All sensitive routes must be protected using JWT authentication.

---

### 3. No Secrets in Frontend

No sensitive keys or credentials are exposed in client-side code.

---

### 4. Input Validation

All incoming requests are validated before processing.

---

### 5. Socket Security

Real-time events are authenticated and scoped per user session.

---

## Data Protection

Chizze stores:

- user profiles
- conversations
- intents
- context data

We ensure:

- data isolation per user
- no public exposure of private data
- controlled access via authentication layer

---

## Future Security Improvements

Planned enhancements:

- rate limiting (Redis-based)
- refresh token rotation
- audit logs
- encryption for sensitive context
- role-based access control (RBAC)

---

## Responsible Disclosure

We kindly ask security researchers to:

- avoid public disclosure until fix is released
- allow reasonable time for patching issues
- provide reproducible steps

---

## Thank You

Security contributions are highly valued.

Helping secure Chizze helps protect all users and their personal context data.