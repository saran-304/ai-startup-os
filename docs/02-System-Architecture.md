# ProfitPilot AI - System Architecture Document

## Document Information
- **Version**: 1.0
- **Date**: July 14, 2026
- **Status**: Draft
- **Product**: ProfitPilot AI

---

## Table of Contents
1. Architecture Overview
2. System Components
3. Technology Stack
4. Architecture Patterns
5. Data Architecture
6. Security Architecture
7. Multi-Tenancy Architecture
8. AI/ML Architecture
9. Integration Architecture
10. Deployment Architecture
11. Scalability Strategy
12. High Availability Design
13. Disaster Recovery
14. Monitoring & Observability
15. API Gateway Design
16. Microservices Design
17. Event-Driven Architecture
18. Caching Strategy
19. File Storage Architecture
20. Performance Optimization

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

ProfitPilot AI follows a **microservices architecture** with a **modular monolith** approach for the initial phase, allowing for gradual migration to full microservices as the system scales.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Web App (Next.js)  │  Mobile App (React Native - Phase 2)     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CDN / Load Balancer                         │
│                    (AWS CloudFront + ALB)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│                    (NestJS + Rate Limiting)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend   │    │   Backend    │    │  AI Service  │
│   (Next.js)  │    │   (NestJS)   │    │ (FastAPI)    │
└──────────────┘    └──────────────┘    └──────────────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Redis      │    │ PostgreSQL   │    │   OpenAI     │
│   (Cache)    │    │  (Primary)   │    │   API        │
└──────────────┘    └──────────────┘    └──────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
│  Stripe │ SendGrid │ Twilio │ AWS S3 │ GST API (Phase 2)      │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Architectural Principles

1. **Separation of Concerns**: Clear boundaries between layers and modules
2. **Scalability**: Horizontal scaling capability
3. **Maintainability**: Clean code, modular design
4. **Security**: Defense in depth, zero trust
5. **Performance**: Optimized for low latency
6. **Reliability**: High availability, fault tolerance
7. **Flexibility**: Easy to extend and modify
8. **Testability**: Comprehensive testing strategy

### 1.3 Architectural Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| Modular Monolith | Faster development, simpler deployment | Limited scalability initially |
| NestJS for Backend | TypeScript, excellent DI, enterprise-ready | Learning curve |
| Next.js for Frontend | SSR, SEO-friendly, great DX | Build complexity |
| PostgreSQL | Relational, ACID, JSON support | NoSQL features limited |
| Prisma ORM | Type-safe, migrations, great DX | Performance overhead |
| Redis Cache | Fast, versatile, battle-tested | Memory dependency |
| JWT Auth | Stateless, scalable | Token revocation complexity |

---

## 2. System Components

### 2.1 Frontend Application

**Technology**: Next.js 14+ with App Router

**Components**:
- **Pages**: Dashboard, Inventory, Sales, Purchases, Reports, Settings
- **Components**: Reusable UI components (shadcn/ui)
- **State Management**: React Query for server state, Zustand for client state
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Routing**: Next.js App Router with middleware for auth

**Key Features**:
- Server-side rendering for performance
- Static generation where possible
- API routes for backend communication
- Optimistic updates for better UX
- Infinite scrolling for large datasets

### 2.2 Backend Application

**Technology**: NestJS 10+ with TypeScript

**Modules**:
- **Auth Module**: Authentication, authorization, JWT
- **User Module**: User management, roles, permissions
- **Organization Module**: Organization, branch management
- **Product Module**: Product catalog, variants, categories
- **Inventory Module**: Stock management, transfers, adjustments
- **Purchase Module**: Purchase orders, GRN, returns
- **Sales Module**: Sales orders, quotations, delivery
- **Invoice Module**: GST invoicing, payment tracking
- **Customer Module**: CRM, credit management
- **Supplier Module**: Supplier management, performance
- **Expense Module**: Expense tracking, approvals
- **Employee Module**: HR, payroll, attendance
- **Report Module**: Report generation, scheduling
- **Analytics Module**: Dashboards, KPIs
- **Notification Module**: Email, SMS, WhatsApp
- **Subscription Module**: Billing, plans, usage
- **Settings Module**: Configuration, preferences

**Architecture Pattern**:
- Clean Architecture (Controller → Service → Repository)
- Dependency Injection
- Middleware for cross-cutting concerns
- Guards for authorization
- Interceptors for logging
- Pipes for validation

### 2.3 AI Service

**Technology**: Python FastAPI

**Components**:
- **Health Score Engine**: Calculate business health metrics
- **Loss Detection Engine**: Anomaly detection, fraud detection
- **Forecast Engine**: Sales prediction, demand forecasting
- **Recommendation Engine**: Product, supplier, price recommendations
- **NLP Assistant**: Natural language query processing

**Integration**:
- REST API communication with backend
- OpenAI API for LLM capabilities
- Custom ML models (Phase 2)
- LangChain for orchestration (optional)

### 2.4 Database Layer

**Primary Database**: PostgreSQL 15+

**Features**:
- Multi-tenant data isolation
- Row-level security
- Full-text search
- JSONB for flexible schemas
- Partitioning (Phase 2)
- Read replicas (Phase 2)

**ORM**: Prisma
- Type-safe queries
- Automatic migrations
- Seed data management
- Connection pooling

### 2.5 Cache Layer

**Technology**: Redis

**Use Cases**:
- Session storage
- API response caching
- Rate limiting
- Real-time analytics
- Pub/Sub for notifications
- Distributed locks

### 2.6 File Storage

**Technology**: AWS S3

**Use Cases**:
- Product images
- Document uploads (invoices, receipts)
- User avatars
- Organization logos
- Report exports
- Backup storage

---

## 3. Technology Stack

### 3.1 Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ | React framework |
| React | 18+ | UI library |
| TypeScript | 5+ | Type safety |
| TailwindCSS | 3+ | Styling |
| shadcn/ui | Latest | UI components |
| React Query | 4+ | Server state |
| Zustand | 4+ | Client state |
| React Hook Form | 7+ | Form management |
| Zod | 3+ | Validation |
| Recharts | 2+ | Charts |
| Lucide React | Latest | Icons |
| ESLint | Latest | Linting |
| Prettier | Latest | Formatting |

### 3.2 Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | 10+ | Framework |
| TypeScript | 5+ | Type safety |
| Prisma | 5+ | ORM |
| PostgreSQL | 15+ | Database |
| Redis | 7+ | Cache |
| JWT | Latest | Authentication |
| bcrypt | Latest | Password hashing |
| class-validator | Latest | Validation |
| Swagger | Latest | API docs |
| Jest | Latest | Testing |
| Bull | Latest | Queue processing |
| Passport | Latest | Auth strategies |

### 3.3 AI/ML Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Language |
| FastAPI | Latest | API framework |
| OpenAI API | Latest | LLM |
| LangChain | Latest | Orchestration |
| Pandas | Latest | Data processing |
| NumPy | Latest | Numerical computing |
| Scikit-learn | Latest | ML models |
| TensorFlow | Latest | Deep learning (Phase 2) |
| PyTorch | Latest | Deep learning (Phase 2) |

### 3.4 Infrastructure Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| AWS | Latest | Cloud provider |
| Docker | Latest | Containerization |
| GitHub Actions | Latest | CI/CD |
| Terraform | Latest | IaC (Phase 2) |
| Kubernetes | Latest | Orchestration (Phase 2) |
| CloudFront | Latest | CDN |
| ALB | Latest | Load balancer |
| S3 | Latest | Object storage |
| RDS | Latest | Managed database |
| ElastiCache | Latest | Managed Redis |
| CloudWatch | Latest | Monitoring |

### 3.5 Integration Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Stripe | Latest | Payments |
| SendGrid | Latest | Email |
| Twilio | Latest | SMS/WhatsApp |
| AWS SES | Latest | Email backup |

---

## 4. Architecture Patterns

### 4.1 Clean Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│              (Controllers, DTOs, Validation)             │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     Business Logic Layer                 │
│                   (Services, Use Cases)                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Data Access Layer                    │
│                  (Repositories, Prisma)                  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     Infrastructure Layer                  │
│              (Database, External Services, Cache)        │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Repository Pattern

```typescript
// Generic Repository Interface
interface IRepository<T> {
  findById(id: string): Promise<T>;
  findAll(options: FindOptions): Promise<T[]>;
  create(data: CreateDto): Promise<T>;
  update(id: string, data: UpdateDto): Promise<T>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}

// Implementation
@Injectable()
class ProductRepository implements IRepository<Product> {
  constructor(private prisma: PrismaService) {}
  
  async findById(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }
  
  // ... other methods
}
```

### 4.3 Dependency Injection

NestJS provides built-in DI container:

```typescript
@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    {
      provide: 'IProductRepository',
      useClass: ProductRepository,
    },
  ],
  exports: [ProductService],
})
export class ProductModule {}
```

### 4.4 Middleware Pattern

```typescript
// Auth Middleware
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  
  use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractToken(req);
    if (token) {
      req.user = this.jwtService.verify(token);
    }
    next();
  }
}
```

### 4.5 Guard Pattern

```typescript
// Role-based Guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;
    
    const user = context.switchToHttp().getRequest().user;
    return requiredRoles.some(role => user.roles.includes(role));
  }
}
```

---

## 5. Data Architecture

### 5.1 Database Schema Design

**Approach**: Normalized schema with proper relationships

**Key Tables**:
- `tenants` - Organization/tenant data
- `users` - User accounts
- `roles` - Role definitions
- `permissions` - Permission definitions
- `organizations` - Business organizations
- `branches` - Organization branches
- `products` - Product catalog
- `inventory` - Stock levels
- `customers` - Customer master
- `suppliers` - Supplier master
- `sales` - Sales orders
- `purchases` - Purchase orders
- `invoices` - GST invoices
- `expenses` - Expense records
- `employees` - Employee records
- `notifications` - Notification logs
- `audit_logs` - Audit trail

### 5.2 Data Flow

```
Client Request → API Gateway → Validation → Business Logic → 
Repository → Database → Response → Cache → Client
```

### 5.3 Data Consistency

**Strategies**:
- ACID transactions for critical operations
- Optimistic locking for concurrent updates
- Eventual consistency for non-critical data
- Saga pattern for distributed transactions (Phase 2)

### 5.4 Data Partitioning

**Phase 1**: Single database with tenant_id column

**Phase 2**: Database sharding by tenant_id

### 5.5 Data Archival

**Strategy**:
- Move historical data (> 2 years) to archive tables
- Compress archived data
- Cold storage for very old data (> 5 years)

---

## 6. Security Architecture

### 6.1 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Network Security                      │
│              (WAF, DDoS, TLS, IP Whitelist)              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Application Security                   │
│         (Auth, RBAC, Input Validation, Rate Limiting)   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Data Security                       │
│          (Encryption at Rest, Encryption in Transit)     │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Audit & Monitoring                     │
│           (Audit Logs, Security Events, Alerts)          │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Authentication Flow

```
1. User submits credentials
2. Server validates credentials
3. Server generates JWT access token (15 min expiry)
4. Server generates refresh token (7 day expiry)
5. Server stores refresh token hash in database
6. Client stores tokens securely
7. Client includes access token in requests
8. Server validates token on each request
9. When access token expires, client uses refresh token
10. Server issues new tokens if refresh token valid
```

### 6.3 Authorization Model

**RBAC (Role-Based Access Control)**:

```
User → Roles → Permissions → Resources

Example:
User: john@company.com
Roles: [Sales Manager, Inventory Viewer]
Permissions: [CREATE_SALE, VIEW_SALE, VIEW_INVENTORY]
Resources: Sales, Inventory
```

### 6.4 Data Encryption

**At Rest**:
- Database: AES-256 encryption (AWS RDS)
- S3: Server-side encryption (SSE-S3)
- Secrets: AWS Secrets Manager (KMS encrypted)

**In Transit**:
- TLS 1.3 for all communications
- Certificate pinning for mobile apps (Phase 2)

### 6.5 Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 7. Multi-Tenancy Architecture

### 7.1 Tenant Isolation Strategy

**Phase 1**: Shared Database, Shared Schema (Row-Level Security)

```sql
-- All tables include tenant_id
CREATE TABLE products (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  -- ...
);

-- Row-level security policy
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON products
  USING (tenant_id = current_setting('app.current_tenant')::UUID);
```

**Phase 2**: Database per Tenant (for large tenants)

### 7.2 Tenant Context

**Middleware**:
```typescript
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'];
    if (tenantId) {
      // Set tenant context for database queries
      req.tenantId = tenantId;
    }
    next();
  }
}
```

### 7.3 Tenant Configuration

**Per-Tenant Settings**:
- Branding (logo, colors, domain)
- Feature flags
- Rate limits
- Storage quotas
- Custom fields

### 7.4 Tenant Onboarding

**Process**:
1. User signs up
2. Create tenant record
3. Create admin user
4. Initialize default data
5. Configure settings
6. Send welcome email

---

## 8. AI/ML Architecture

### 8.1 AI Service Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Backend (NestJS)                       │
│              Requests AI Analysis                        │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  AI Service (FastAPI)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Health  │  │  Loss    │  │ Forecast │              │
│  │  Score   │  │ Detection│  │  Engine  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Recommend│  │   NLP    │  │   ML     │              │
│  │  Engine  │  │ Assistant│  │  Models  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   External AI Services                    │
│                    (OpenAI API)                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 AI Module Design

**Health Score Engine**:
```python
class HealthScoreEngine:
    def calculate_financial_health(self, data: FinancialData) -> float:
        # Calculate revenue growth, profit margin, cash flow
        pass
    
    def calculate_operational_health(self, data: OperationalData) -> float:
        # Calculate efficiency, productivity, quality
        pass
    
    def calculate_overall_health(self, data: BusinessData) -> HealthScore:
        # Aggregate all health metrics
        pass
```

**Loss Detection Engine**:
```python
class LossDetectionEngine:
    def detect_revenue_leaks(self, sales_data: SalesData) -> List[Anomaly]:
        # Identify unusual patterns in sales
        pass
    
    def detect_inventory_shrinkage(self, inventory_data: InventoryData) -> List[Anomaly]:
        # Identify missing inventory
        pass
```

**Forecast Engine**:
```python
class ForecastEngine:
    def forecast_sales(self, historical_data: SalesData) -> SalesForecast:
        # Time series forecasting
        pass
    
    def forecast_demand(self, product_data: ProductData) -> DemandForecast:
        # Demand prediction
        pass
```

### 8.3 Data Pipeline for AI

```
Database → Data Extraction → Transformation → Feature Engineering → 
Model Training → Model Evaluation → Model Deployment → Prediction → 
Result Storage → API Response
```

### 8.4 Model Management

**Phase 1**: Use OpenAI API for LLM capabilities

**Phase 2**: Train custom models
- Sales forecasting (Time series)
- Customer segmentation (Clustering)
- Fraud detection (Classification)
- Demand prediction (Regression)

---

## 9. Integration Architecture

### 9.1 Payment Integration (Stripe)

```typescript
// Payment Service
@Injectable()
export class PaymentService {
  constructor(private stripe: Stripe) {}
  
  async createSubscription(customerId: string, planId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: planId }],
    });
  }
  
  async handleWebhook(event: Stripe.Event) {
    switch (event.type) {
      case 'invoice.payment_succeeded':
        // Update subscription status
        break;
      case 'invoice.payment_failed':
        // Handle payment failure
        break;
    }
  }
}
```

### 9.2 Email Integration (SendGrid)

```typescript
// Email Service
@Injectable()
export class EmailService {
  constructor(@Inject('SENDGRID') private sendGrid: SendGrid) {}
  
  async sendWelcomeEmail(email: string, name: string) {
    await this.sendGrid.send({
      to: email,
      templateId: 'welcome-template',
      dynamicTemplateData: { name },
    });
  }
}
```

### 9.3 SMS Integration (Twilio)

```typescript
// SMS Service
@Injectable()
export class SMSService {
  constructor(private twilio: Twilio) {}
  
  async sendOTP(phone: string, otp: string) {
    await this.twilio.messages.create({
      to: phone,
      body: `Your OTP is ${otp}`,
    });
  }
}
```

### 9.4 Webhook Architecture

```typescript
// Webhook Controller
@Controller('webhooks')
export class WebhookController {
  @Post('stripe')
  async handleStripeWebhook(@Body() event: Stripe.Event) {
    await this.paymentService.handleWebhook(event);
  }
  
  @Post('gst')
  async handleGSTWebhook(@Body() data: GSTWebhookData) {
    await this.gstService.handleWebhook(data);
  }
}
```

---

## 10. Deployment Architecture

### 10.1 Infrastructure Diagram (Phase 1)

```
┌─────────────────────────────────────────────────────────┐
│                        AWS Region                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              VPC (10.0.0.0/16)                  │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │         Public Subnet (10.0.1.0/24)      │   │   │
│  │  │  ┌─────────────┐  ┌─────────────┐       │   │   │
│  │  │  │   ALB/NGINX │  │   Bastion   │       │   │   │
│  │  │  └─────────────┘  └─────────────┘       │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │        Private Subnet (10.0.2.0/24)     │   │   │
│  │  │  ┌─────────────┐  ┌─────────────┐       │   │   │
│  │  │  │   ECS/Fargate│  │   RDS       │       │   │   │
│  │  │  │   (App)     │  │  (Postgres) │       │   │   │
│  │  │  └─────────────┘  └─────────────┘       │   │   │
│  │  │  ┌─────────────┐  ┌─────────────┐       │   │   │
│  │  │  │ElastiCache  │  │   S3        │       │   │   │
│  │  │  │  (Redis)    │  │  (Storage)  │       │   │   │
│  │  │  └─────────────┘  └─────────────┘       │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 10.2 Container Strategy

**Docker Compose (Development)**:
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports: ["3000:3000"]
  
  backend:
    build: ./backend
    ports: ["3001:3001"]
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://redis:6379
  
  ai-service:
    build: ./ai-service
    ports: ["8000:8000"]
  
  postgres:
    image: postgres:15
    ports: ["5432:5432"]
    environment:
      - POSTGRES_PASSWORD=secret
  
  redis:
    image: redis:7
    ports: ["6379:6379"]
```

**ECS Fargate (Production)**:
- Task definitions for each service
- Auto-scaling based on CPU/memory
- Load balancing with ALB
- Blue-green deployments

### 10.3 CI/CD Pipeline

**GitHub Actions Workflow**:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
  
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster profitpilot --service backend
```

---

## 11. Scalability Strategy

### 11.1 Horizontal Scaling

**Stateless Design**:
- All application services are stateless
- Session data stored in Redis
- File uploads go to S3
- Database connection pooling

**Auto-scaling**:
```yaml
# ECS Auto-scaling
AutoScaling:
  MinCapacity: 2
  MaxCapacity: 10
  TargetCPU: 70%
  TargetMemory: 80%
```

### 11.2 Database Scaling

**Read Replicas**:
- Primary for writes
- Read replicas for reads
- Application routes read queries to replicas

**Connection Pooling**:
```typescript
// Prisma connection pool
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  connection_limit = 20
}
```

### 11.3 Caching Strategy

**Multi-level Caching**:
1. Browser cache (static assets)
2. CDN cache (CloudFront)
3. Application cache (Redis)
4. Database cache (PostgreSQL query cache)

**Cache Invalidation**:
- Time-based expiration
- Event-based invalidation
- Cache warming for critical data

---

## 12. High Availability Design

### 12.1 Availability Targets

- **Overall**: 99.9% (8.76 hours downtime/year)
- **Critical APIs**: 99.95% (4.38 hours downtime/year)
- **Database**: 99.99% (52.56 minutes downtime/year)

### 12.2 Redundancy Strategy

**Application**:
- Multi-AZ deployment
- Auto-scaling groups
- Load balancing
- Health checks

**Database**:
- Multi-AZ RDS
- Automated backups
- Read replicas
- Point-in-time recovery

**Cache**:
- Redis Cluster
- Multi-AZ deployment
- Automatic failover

### 12.3 Failover Strategy

**Database Failover**:
- RDS automatic failover (< 30 seconds)
- Application retry logic
- Connection pool management

**Application Failover**:
- Health check based
- Graceful shutdown
- Request draining

---

## 13. Disaster Recovery

### 13.1 Backup Strategy

**Database Backups**:
- Daily automated backups
- 30-day retention
- Cross-region copy (weekly)
- Backup encryption

**S3 Backups**:
- Versioning enabled
- Lifecycle policies
- Cross-region replication

### 13.2 Recovery Procedures

**RTO (Recovery Time Objective)**: 4 hours
**RPO (Recovery Point Objective)**: 1 hour

**Scenarios**:
1. **Single server failure**: Auto-scaling handles
2. **AZ failure**: Multi-AZ deployment handles
3. **Region failure**: Cross-region backup (Phase 2)
4. **Data corruption**: Point-in-time recovery

---

## 14. Monitoring & Observability

### 14.1 Monitoring Stack

**CloudWatch**:
- Metrics: CPU, memory, disk, network
- Logs: Application logs, access logs
- Alarms: Threshold-based alerts
- Dashboards: Custom dashboards

**Application Monitoring**:
- APM: DataDog or New Relic (Phase 2)
- Error tracking: Sentry
- Uptime monitoring: Pingdom

### 14.2 Logging Strategy

**Structured Logging**:
```typescript
logger.log({
  level: 'info',
  message: 'User created',
  context: {
    userId: user.id,
    tenantId: user.tenantId,
    timestamp: new Date().toISOString(),
  },
});
```

**Log Levels**:
- ERROR: Critical errors
- WARN: Warning conditions
- INFO: Informational messages
- DEBUG: Debug information

### 14.3 Alerting

**Critical Alerts**:
- Service down
- Error rate > 1%
- Response time > 2s
- Database connection failures
- Disk space > 80%

**Warning Alerts**:
- High CPU usage
- Memory pressure
- Slow queries
- API rate limit breaches

---

## 15. API Gateway Design

### 15.1 Gateway Responsibilities

- Request routing
- Authentication/authorization
- Rate limiting
- Request/response transformation
- Caching
- Logging/monitoring

### 15.2 API Versioning

**URL-based versioning**:
```
/api/v1/products
/api/v2/products
```

### 15.3 Rate Limiting Strategy

**Per-tenant limits**:
- Free tier: 100 requests/minute
- Growth tier: 1000 requests/minute
- Business tier: 10000 requests/minute
- Enterprise: Custom limits

**Implementation**:
```typescript
// Redis-based rate limiting
@Injectable()
export class RateLimitGuard implements CanActivate {
  async canActivate(context: ExecutionContext): boolean {
    const key = `rate_limit:${tenantId}:${userId}`;
    const count = await this.redis.incr(key);
    if (count === 1) {
      await this.redis.expire(key, 60); // 1 minute window
    }
    return count <= this.getLimit(tenantId);
  }
}
```

---

## 16. Microservices Design

### 16.1 Service Boundaries

**Phase 1 (Modular Monolith)**:
- Single NestJS application
- Modular structure
- Shared database
- Clear module boundaries

**Phase 2 (Microservices)**:
- Auth Service
- Organization Service
- Product Service
- Inventory Service
- Sales Service
- Purchase Service
- Invoice Service
- Report Service
- AI Service
- Notification Service

### 16.2 Inter-Service Communication

**Phase 1**: Direct function calls (same process)

**Phase 2**:
- Synchronous: REST/gRPC
- Asynchronous: Message queue (RabbitMQ/SQS)

### 16.3 Service Discovery

**Phase 1**: N/A (monolith)

**Phase 2**: AWS Cloud Map or Consul

---

## 17. Event-Driven Architecture

### 17.1 Event Design

**Event Types**:
- UserCreated
- OrganizationCreated
- ProductCreated
- SaleCompleted
- InvoiceGenerated
- PaymentReceived

**Event Schema**:
```typescript
interface Event {
  id: string;
  type: string;
  version: number;
  data: any;
  metadata: {
    timestamp: string;
    source: string;
    correlationId: string;
  };
}
```

### 17.2 Event Bus

**Phase 1**: In-memory event emitter

**Phase 2**: AWS EventBridge or RabbitMQ

### 17.3 Event Handlers

```typescript
@EventHandler(SaleCompletedEvent)
async handleSaleCompleted(event: SaleCompletedEvent) {
  // Update inventory
  await this.inventoryService.adjustStock(event.items);
  
  // Generate invoice
  await this.invoiceService.generateInvoice(event.saleId);
  
  // Send notification
  await this.notificationService.sendSaleConfirmation(event.customerId);
}
```

---

## 18. Caching Strategy

### 18.1 Cache Layers

**L1: Browser Cache**
- Static assets (CSS, JS, images)
- Cache-Control headers
- ETags

**L2: CDN Cache**
- CloudFront
- Edge locations
- Dynamic content caching

**L3: Application Cache**
- Redis
- Session data
- API responses
- Computed results

**L4: Database Cache**
- PostgreSQL query cache
- Materialized views

### 18.2 Cache Patterns

**Cache-Aside**:
```typescript
async getProduct(id: string) {
  const cached = await this.redis.get(`product:${id}`);
  if (cached) return JSON.parse(cached);
  
  const product = await this.repository.findById(id);
  await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 3600);
  return product;
}
```

**Write-Through**:
```typescript
async updateProduct(id: string, data: UpdateProductDto) {
  const product = await this.repository.update(id, data);
  await this.redis.set(`product:${id}`, JSON.stringify(product), 'EX', 3600);
  return product;
}
```

### 18.3 Cache Invalidation

**Strategies**:
- Time-based expiration
- Event-based invalidation
- Manual invalidation
- Cache warming

---

## 19. File Storage Architecture

### 19.1 S3 Bucket Structure

```
profitpilot-prod/
├── tenants/
│   └── {tenantId}/
│       ├── products/
│       │   └── {productId}/
│       │       └── images/
│       ├── documents/
│       │   ├── invoices/
│       │   └── receipts/
│       └── logos/
├── backups/
└── exports/
```

### 19.2 File Upload Flow

```
Client → Pre-signed URL → Direct S3 Upload → 
Database Record → Thumbnail Generation → CDN Distribution
```

### 19.3 File Security

- Private buckets with IAM policies
- Pre-signed URLs for temporary access
- Server-side encryption
- Virus scanning (Phase 2)

---

## 20. Performance Optimization

### 20.1 Database Optimization

**Indexing Strategy**:
```sql
-- Composite indexes for common queries
CREATE INDEX idx_sales_tenant_date ON sales(tenant_id, created_at);
CREATE INDEX idx_products_tenant_category ON products(tenant_id, category_id);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(tenant_id) WHERE deleted_at IS NULL;
```

**Query Optimization**:
- Use EXPLAIN ANALYZE
- Avoid N+1 queries
- Use select specific columns
- Batch operations

### 20.2 API Optimization

**Pagination**:
```typescript
// Cursor-based pagination
async findAll(cursor?: string, limit: number = 50) {
  return this.prisma.product.findMany({
    take: limit,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { id: 'asc' },
  });
}
```

**Compression**:
- Gzip compression for responses
- Minified JavaScript/CSS
- Image optimization

**Lazy Loading**:
- Code splitting
- Dynamic imports
- Image lazy loading

### 20.3 Frontend Optimization

**Next.js Optimizations**:
- Server-side rendering
- Static generation
- Image optimization
- Font optimization
- Script optimization

**Performance Budget**:
- Initial load < 2s
- Time to interactive < 3s
- First contentful paint < 1s

---

## Appendix

### A. Architecture Decision Records (ADRs)

| ADR | Decision | Status | Date |
|-----|----------|--------|------|
| ADR-001 | Use NestJS for backend | Accepted | 2026-07-14 |
| ADR-002 | Use Next.js for frontend | Accepted | 2026-07-14 |
| ADR-003 | Use PostgreSQL as primary database | Accepted | 2026-07-14 |
| ADR-004 | Use Prisma as ORM | Accepted | 2026-07-14 |
| ADR-005 | Use Redis for caching | Accepted | 2026-07-14 |

### B. Technology Alternatives Considered

| Component | Chosen | Alternatives | Reason |
|-----------|--------|--------------|--------|
| Backend | NestJS | Express, Fastify | Enterprise features, TypeScript |
| Frontend | Next.js | React, Vue, Angular | SSR, SEO, DX |
| Database | PostgreSQL | MySQL, MongoDB | ACID, JSONB, Relational |
| ORM | Prisma | TypeORM, Sequelize | Type-safe, migrations |
| Cache | Redis | Memcached | Features, persistence |

### C. References

- AWS Well-Architected Framework
- 12-Factor App
- Clean Architecture (Robert C. Martin)
- Building Microservices (Sam Newman)
- Designing Data-Intensive Applications (Martin Kleppmann)

---

**End of Document**
