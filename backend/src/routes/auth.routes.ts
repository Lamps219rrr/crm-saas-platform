import { Router, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthenticatedRequest, authenticate, authorize } from '../middleware/auth'
import { createSuccessResponse } from '../utils/response'
import { jwtUtils, passwordUtils } from '../utils/auth'
import { emailService } from '../utils/email'
import { validateEmail, slugify } from '../utils/validators'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  companyName: z.string().min(2),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, companyName } = registerSchema.parse(req.body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ status: 'error', message: 'User already exists' })
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name: companyName,
        slug: slugify(companyName),
      },
    })

    // Create user
    const hashedPassword = await passwordUtils.hash(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        companyId: company.id,
        role: 'ADMIN',
      },
    })

    // Generate tokens
    const accessToken = jwtUtils.generateToken({
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      role: user.role,
    })

    const refreshToken = jwtUtils.generateRefreshToken({
      id: user.id,
    })

    // Send welcome email
    await emailService.sendWelcome(user.email, user.firstName!)

    res.status(201).json(
      createSuccessResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          accessToken,
          refreshToken,
        },
        'Registration successful',
      ),
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'error', errors: error.errors })
    }
    throw error
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' })
    }

    const isPasswordValid = await passwordUtils.compare(password, user.password!)

    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' })
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    const accessToken = jwtUtils.generateToken({
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      role: user.role,
    })

    const refreshToken = jwtUtils.generateRefreshToken({
      id: user.id,
    })

    res.json(
      createSuccessResponse(
        {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          accessToken,
          refreshToken,
        },
        'Login successful',
      ),
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ status: 'error', errors: error.errors })
    }
    throw error
  }
})

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ status: 'error', message: 'No refresh token provided' })
    }

    const decoded = jwtUtils.verifyToken(refreshToken)
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: decoded.id },
    })

    const newAccessToken = jwtUtils.generateToken({
      id: user.id,
      email: user.email,
      companyId: user.companyId,
      role: user.role,
    })

    res.json(
      createSuccessResponse(
        {
          accessToken: newAccessToken,
        },
        'Token refreshed',
      ),
    )
  } catch (error) {
    res.status(401).json({ status: 'error', message: 'Invalid refresh token' })
  }
})

// Get current user
router.get('/me', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: req.user?.id },
    include: { company: true, team: true },
  })

  res.json(createSuccessResponse(user))
})

// Logout
router.post('/logout', authenticate, (req: AuthenticatedRequest, res: Response) => {
  res.json(createSuccessResponse(null, 'Logout successful'))
})

export default router
