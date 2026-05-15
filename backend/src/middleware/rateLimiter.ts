import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
  windowMs: (process.env.API_RATE_WINDOW || 15) * 60 * 1000,
  max: process.env.API_RATE_LIMIT ? parseInt(process.env.API_RATE_LIMIT) : 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health'
  },
})

export const rateLimiter = apiLimiter
