# VulnX - Enterprise Vulnerability Management Platform

An enterprise-grade vulnerability management platform that discovers network services, correlates software fingerprints with CVE intelligence, and prioritizes remediation using contextual risk scoring.

## Architecture Highlights
- **Microservices Architecture:** Coordinating Node.js API, Python FastAPI Scanner, Redis, and PostgreSQL.
- **Asynchronous Pipeline:** Using Celery and Redis for non-blocking network scans and processing.
- **Real-Time Communication:** WebSockets for live scan progress.
- **Vulnerability Intelligence:** Integration with NVD/CVE APIs and CPE matching.
- **Security & Access Control:** RBAC, JWT authentication, audit logging.
- **DevSecOps:** Docker containerization, CI/CD with GitHub Actions.

## Project Structure
- `/frontend` - React, TypeScript, Tailwind, Recharts dashboard
- `/backend` - Node.js/Express main API (Auth, Assets, Vulnerabilities CRUD)
- `/scanner` - Python/FastAPI async scanning engine (Nmap, NVD matching, Risk Scoring)
- `/infrastructure` - Docker Compose, Prometheus, Grafana
- `/docs` - Architecture and API documentation

## Features
- Asset Management
- Vulnerability Lifecycle Management
- Contextual Risk Scoring Engine
- Real-time Scanning Dashboard
- Executive & Technical Reporting

## Setup Instructions (Local Lab)
*Detailed setup instructions will be provided as the project develops.*
