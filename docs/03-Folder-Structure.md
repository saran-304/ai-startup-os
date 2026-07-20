# ProfitPilot AI - Project Folder Structure

## Document Information
- **Version**: 1.0
- **Date**: July 14, 2026
- **Status**: Draft
- **Product**: ProfitPilot AI

---

## Root Directory Structure

```
profitpilot-ai/
├── docs/                          # Documentation
├── frontend/                      # Next.js Frontend Application
├── backend/                       # NestJS Backend Application
├── ai-service/                    # Python FastAPI AI Service
├── deployment/                    # Docker & Deployment Configurations
├── scripts/                       # Utility Scripts
├── .github/                       # GitHub Actions & Workflows
├── docker-compose.yml             # Local Development
├── docker-compose.prod.yml        # Production Deployment
├── .gitignore
├── README.md
└── LICENSE
```

---

## Detailed Folder Structure

### 1. Documentation (docs/)

```
docs/
├── 01-PRD.md                      # Product Requirements Document
├── 02-System-Architecture.md      # System Architecture
├── 03-Folder-Structure.md         # This file
├── 04-Database-Schema.md          # Database Design
├── 05-API-Specification.md        # API Documentation
├── 06-UI-UX-Design-System.md      # Design System
├── 07-Development-Guide.md        # Development Guidelines
├── 08-Testing-Guide.md            # Testing Strategy
├── 09-Deployment-Guide.md        # Deployment Guide
└── 10-Security-Guide.md           # Security Guidelines
```

### 2. Frontend (frontend/)

```
frontend/
├── public/                        # Static Assets
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Auth Routes
│   │   ├── (dashboard)/           # Dashboard Routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/                # React Components
│   │   ├── ui/                    # shadcn/ui Components
│   │   ├── layout/                # Layout Components
│   │   ├── dashboard/             # Dashboard Components
│   │   ├── products/              # Product Components
│   │   ├── inventory/             # Inventory Components
│   │   ├── sales/                 # Sales Components
│   │   ├── invoices/              # Invoice Components
│   │   ├── customers/             # Customer Components
│   │   ├── suppliers/             # Supplier Components
│   │   ├── expenses/              # Expense Components
│   │   ├── employees/             # Employee Components
│   │   ├── reports/               # Report Components
│   │   ├── analytics/             # Analytics Components
│   │   ├── ai/                    # AI Components
│   │   ├── common/                # Common Components
│   │   └── auth/                  # Auth Components
│   ├── lib/                       # Utility Libraries
│   │   ├── api/                   # API Client
│   │   ├── hooks/                 # Custom Hooks
│   │   ├── utils/                 # Utility Functions
│   │   └── validations/           # Zod Schemas
│   ├── store/                     # State Management (Zustand)
│   ├── types/                     # TypeScript Types
│   └── config/                    # Configuration Files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.local
```

### 3. Backend (backend/)

```
backend/
├── src/
│   ├── main.ts                    # Application Entry Point
│   ├── app.module.ts              # Root Module
│   ├── common/                    # Common Modules
│   │   ├── decorators/            # Custom Decorators
│   │   ├── filters/               # Exception Filters
│   │   ├── guards/                # Auth Guards
│   │   ├── interceptors/          # Interceptors
│   │   ├── middlewares/           # Middlewares
│   │   ├── pipes/                 # Validation Pipes
│   │   └── utils/                 # Utility Functions
│   ├── config/                    # Configuration
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   ├── jwt.config.ts
│   │   └── stripe.config.ts
│   ├── modules/                   # Feature Modules
│   │   ├── auth/                  # Auth Module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   └── strategies/
│   │   ├── users/                 # Users Module
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── users.module.ts
│   │   │   └── dto/
│   │   ├── organizations/         # Organizations Module
│   │   │   ├── organizations.controller.ts
│   │   │   ├── organizations.service.ts
│   │   │   ├── organizations.repository.ts
│   │   │   ├── organizations.module.ts
│   │   │   └── dto/
│   │   ├── branches/              # Branches Module
│   │   │   ├── branches.controller.ts
│   │   │   ├── branches.service.ts
│   │   │   ├── branches.repository.ts
│   │   │   ├── branches.module.ts
│   │   │   └── dto/
│   │   ├── products/              # Products Module
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   ├── products.repository.ts
│   │   │   ├── products.module.ts
│   │   │   └── dto/
│   │   ├── inventory/             # Inventory Module
│   │   │   ├── inventory.controller.ts
│   │   │   ├── inventory.service.ts
│   │   │   ├── inventory.repository.ts
│   │   │   ├── inventory.module.ts
│   │   │   └── dto/
│   │   ├── purchases/             # Purchases Module
│   │   │   ├── purchases.controller.ts
│   │   │   ├── purchases.service.ts
│   │   │   ├── purchases.repository.ts
│   │   │   ├── purchases.module.ts
│   │   │   └── dto/
│   │   ├── sales/                 # Sales Module
│   │   │   ├── sales.controller.ts
│   │   │   ├── sales.service.ts
│   │   │   ├── sales.repository.ts
│   │   │   ├── sales.module.ts
│   │   │   └── dto/
│   │   ├── invoices/              # Invoices Module
│   │   │   ├── invoices.controller.ts
│   │   │   ├── invoices.service.ts
│   │   │   ├── invoices.repository.ts
│   │   │   ├── invoices.module.ts
│   │   │   └── dto/
│   │   ├── customers/             # Customers Module
│   │   │   ├── customers.controller.ts
│   │   │   ├── customers.service.ts
│   │   │   ├── customers.repository.ts
│   │   │   ├── customers.module.ts
│   │   │   └── dto/
│   │   ├── suppliers/             # Suppliers Module
│   │   │   ├── suppliers.controller.ts
│   │   │   ├── suppliers.service.ts
│   │   │   ├── suppliers.repository.ts
│   │   │   ├── suppliers.module.ts
│   │   │   └── dto/
│   │   ├── expenses/              # Expenses Module
│   │   │   ├── expenses.controller.ts
│   │   │   ├── expenses.service.ts
│   │   │   ├── expenses.repository.ts
│   │   │   ├── expenses.module.ts
│   │   │   └── dto/
│   │   ├── employees/             # Employees Module
│   │   │   ├── employees.controller.ts
│   │   │   ├── employees.service.ts
│   │   │   ├── employees.repository.ts
│   │   │   ├── employees.module.ts
│   │   │   └── dto/
│   │   ├── reports/               # Reports Module
│   │   │   ├── reports.controller.ts
│   │   │   ├── reports.service.ts
│   │   │   ├── reports.module.ts
│   │   │   └── dto/
│   │   ├── analytics/             # Analytics Module
│   │   │   ├── analytics.controller.ts
│   │   │   ├── analytics.service.ts
│   │   │   ├── analytics.module.ts
│   │   │   └── dto/
│   │   ├── notifications/         # Notifications Module
│   │   │   ├── notifications.controller.ts
│   │   │   ├── notifications.service.ts
│   │   │   ├── notifications.module.ts
│   │   │   └── dto/
│   │   ├── subscription/          # Subscription Module
│   │   │   ├── subscription.controller.ts
│   │   │   ├── subscription.service.ts
│   │   │   ├── subscription.module.ts
│   │   │   └── dto/
│   │   ├── settings/              # Settings Module
│   │   │   ├── settings.controller.ts
│   │   │   ├── settings.service.ts
│   │   │   ├── settings.module.ts
│   │   │   └── dto/
│   │   └── ai/                    # AI Module (Proxy)
│   │       ├── ai.controller.ts
│   │       ├── ai.service.ts
│   │       └── ai.module.ts
│   ├── prisma/                    # Prisma ORM
│   │   ├── schema.prisma          # Database Schema
│   │   ├── seed.ts                # Seed Data
│   │   └── migrations/            # Database Migrations
│   └── database/                  # Database Module
│       ├── database.module.ts
│       └── database.service.ts
├── test/                          # Test Files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── tsconfig.json
├── nest-cli.json
├── .env.example
└── .env
```

### 4. AI Service (ai-service/)

```
ai-service/
├── app/
│   ├── main.py                    # Application Entry Point
│   ├── config/                    # Configuration
│   │   ├── settings.py
│   │   └── logging.py
│   ├── api/                       # API Routes
│   │   ├── __init__.py
│   │   ├── router.py
│   │   ├── health.py
│   │   ├── loss_detection.py
│   │   ├── forecasting.py
│   │   ├── recommendations.py
│   │   └── nlp_assistant.py
│   ├── services/                  # Business Logic
│   │   ├── health_score.py
│   │   ├── loss_detection.py
│   │   ├── forecasting.py
│   │   ├── recommendations.py
│   │   └── nlp_assistant.py
│   ├── models/                    # ML Models
│   │   ├── __init__.py
│   │   ├── sales_forecast.py
│   │   ├── demand_forecast.py
│   │   ├── anomaly_detection.py
│   │   └── customer_segmentation.py
│   ├── utils/                     # Utilities
│   │   ├── __init__.py
│   │   ├── data_processor.py
│   │   ├── openai_client.py
│   │   └── validators.py
│   └── schemas/                   # Pydantic Schemas
│       ├── __init__.py
│       ├── health.py
│       ├── loss_detection.py
│       ├── forecasting.py
│       └── recommendations.py
├── tests/                         # Test Files
├── requirements.txt
├── pyproject.toml
├── .env.example
└── .env
```

### 5. Deployment (deployment/)

```
deployment/
├── docker/
│   ├── frontend/
│   │   └── Dockerfile
│   ├── backend/
│   │   └── Dockerfile
│   ├── ai-service/
│   │   └── Dockerfile
│   └── nginx/
│       └── nginx.conf
├── kubernetes/                    # K8s Manifests (Phase 2)
│   ├── namespaces/
│   ├── deployments/
│   ├── services/
│   ├── ingress/
│   └── configmaps/
├── terraform/                     # IaC (Phase 2)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── scripts/
    ├── deploy.sh
    ├── rollback.sh
    └── backup.sh
```

### 6. Scripts (scripts/)

```
scripts/
├── setup.sh                       # Initial Setup
├── dev.sh                         # Development Environment
├── test.sh                        # Run Tests
├── build.sh                       # Build All Services
├── migrate.sh                     # Database Migrations
├── seed.sh                        # Seed Database
└── clean.sh                       # Clean Build Artifacts
```

### 7. GitHub Workflows (.github/)

```
.github/
└── workflows/
    ├── ci.yml                     # Continuous Integration
    ├── cd.yml                     # Continuous Deployment
    ├── test.yml                   # Test Pipeline
    ├── security.yml               # Security Scanning
    └── backup.yml                 # Database Backup
```

---

## File Naming Conventions

### Frontend
- Components: PascalCase (e.g., `ProductTable.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Types: PascalCase (e.g., `Product.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL.ts`)

### Backend
- Classes: PascalCase (e.g., `ProductService`)
- Files: kebab-case (e.g., `product.service.ts`)
- Interfaces: PascalCase with `I` prefix (e.g., `IRepository`)
- DTOs: PascalCase with `Dto` suffix (e.g., `CreateProductDto`)

### AI Service
- Modules: snake_case (e.g., `health_score.py`)
- Classes: PascalCase (e.g., `HealthScoreEngine`)
- Functions: snake_case (e.g., `calculate_health_score`)

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/profitpilot
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG....
TWILIO_ACCOUNT_SID=AC....
TWILIO_AUTH_TOKEN=....
OPENAI_API_KEY=sk-....
AI_SERVICE_URL=http://localhost:8000
```

### AI Service (.env)
```
OPENAI_API_KEY=sk-....
BACKEND_URL=http://localhost:3001
REDIS_URL=redis://localhost:6379
LOG_LEVEL=INFO
```

---

## Summary

This folder structure provides:
- Clear separation of concerns
- Scalable architecture
- Easy navigation
- Consistent naming conventions
- Support for microservices migration
- Comprehensive documentation
- Automated deployment support

**End of Document**
