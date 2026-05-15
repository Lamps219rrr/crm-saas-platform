# CRM SaaS Platform - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- PostgreSQL 14.x or higher
- Docker & Docker Compose (optional)
- npm or yarn

### Option 1: Docker Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/Lamps219rrr/crm-saas-platform.git
cd crm-saas-platform

# Copy environment variables
cp .env.example .env

# Start all services
npm run docker:up

# Run database migrations
npm run db:migrate

# Seed sample data
npm run db:seed
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

### Option 2: Manual Setup

#### 1. Database Setup

```bash
# Create PostgreSQL database
creatdb crm_saas_db

# Create user
psql -U postgres -c "CREATE USER crm_user WITH PASSWORD 'crm_password';"
psql -U postgres -c "ALTER ROLE crm_user CREATEDB;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE crm_saas_db TO crm_user;"
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your values
# DATABASE_URL=postgresql://crm_user:crm_password@localhost:5432/crm_saas_db

# Run migrations
npx prisma migrate dev --name init

# Seed database
npm run seed

# Start backend
npm run dev
# Server running at http://localhost:5000
```

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
# App running at http://localhost:3000
```

## 🔐 Environment Configuration

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=CRM SaaS Platform
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Backend (.env)
```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000
DATABASE_URL=postgresql://crm_user:crm_password@localhost:5432/crm_saas_db
JWT_SECRET=your-super-secret-key-change-in-production
OAUTH_GOOGLE_ID=your-google-oauth-id
OAUTH_GOOGLE_SECRET=your-google-oauth-secret
```

## 🏗️ Project Structure

```
crm-saas-platform/
├── frontend/              # Next.js + React application
│   ├── app/              # App router pages
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and helpers
│   ├── styles/           # Global styles
│   ├── public/           # Static assets
│   ├── package.json
│   └── next.config.js
│
├── backend/               # Express.js API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation
│   │   ├── services/     # Business logic
│   │   ├── utils/        # Helpers
│   │   └── app.ts        # Express setup
│   ├── prisma/           # Database schema
│   ├── package.json
│   └── server.ts
│
├── docker-compose.yml    # Development setup
├── .env.example          # Environment template
└── package.json          # Root workspace
```

## 📦 Available Scripts

### Root
```bash
npm run dev          # Start both frontend and backend
npm run build        # Build both frontend and backend
npm run start        # Start production servers
npm run test         # Run tests for both
npm run lint         # Lint both projects
npm run docker:up    # Start Docker containers
npm run docker:down  # Stop Docker containers
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed sample data
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Backend
```bash
cd backend
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed database
npm run lint         # Run ESLint
tsconfig-check       # Check TypeScript configuration
```

## 🗄️ Database Migrations

```bash
cd backend

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

## 🔑 Default Test Credentials

After seeding, use these credentials:

**Admin Account:**
- Email: admin@crmsaas.com
- Password: Admin@123456
- Company: Acme Corporation

**Sales Rep:**
- Email: sales@crmsaas.com
- Password: Sales@123456
- Company: Acme Corporation

**Manager:**
- Email: manager@crmsaas.com
- Password: Manager@123456
- Company: Acme Corporation

## 🔗 API Documentation

API documentation is available at:
- Swagger UI: http://localhost:5000/api-docs
- Postman Collection: `/docs/postman-collection.json`

## 🚀 Deployment

### Deploy to Vercel (Frontend)

```bash
cd frontend
npm i -g vercel
vercel
```

### Deploy to Heroku (Backend)

```bash
cd backend
heroku login
heroku create your-app-name
heroku addons:create heroku-postgresql:standard-0
git push heroku main
```

### Deploy with Docker

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Push to Docker Hub
docker tag crm-saas-backend:latest your-username/crm-saas-backend:latest
docker push your-username/crm-saas-backend:latest

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm run test

# Backend tests
cd backend
npm run test

# E2E tests
npm run test:e2e
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Reset database
cd backend
npx prisma migrate reset
```

### Docker Issues

```bash
# Clean up all containers
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# View logs
docker-compose logs -f
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion)

## 📞 Support

For issues or questions:
1. Check GitHub Issues
2. Review documentation in `/docs`
3. Contact: support@crmsaas.com

## 📄 License

MIT License - See LICENSE file for details
