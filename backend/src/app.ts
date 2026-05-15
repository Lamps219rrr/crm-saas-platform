import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'express-async-errors'
import { config } from 'dotenv'

// Load environment variables
config()

// Import routes
import authRoutes from './routes/auth.routes'
import contactRoutes from './routes/contact.routes'
import dealRoutes from './routes/deal.routes'
import taskRoutes from './routes/task.routes'
import meetingRoutes from './routes/meeting.routes'
import activityRoutes from './routes/activity.routes'
import analyticsRoutes from './routes/analytics.routes'
import teamRoutes from './routes/team.routes'
import notificationRoutes from './routes/notification.routes'

// Import middleware
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'
import { rateLimiter } from './middleware/rateLimiter'

const app: Express = express()

// Security Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Logging Middleware
app.use(morgan('combined'))
app.use(requestLogger)

// Rate Limiting
app.use(rateLimiter)

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)
app.use('/api/deals', dealRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/meetings', meetingRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/teams', teamRoutes)
app.use('/api/notifications', notificationRoutes)

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    path: req.path,
  })
})

// Error Handler
app.use(errorHandler)

export default app
