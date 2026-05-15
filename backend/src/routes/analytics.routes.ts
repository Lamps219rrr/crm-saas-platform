import { Router } from 'express'
import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthenticatedRequest, authenticate } from '../middleware/auth'
import { createSuccessResponse } from '../utils/response'

const router = Router()
const prisma = new PrismaClient()

router.use(authenticate)

// Get dashboard analytics
router.get('/dashboard', async (req: AuthenticatedRequest, res: Response) => {
  const companyId = req.user?.companyId

  const [totalContacts, totalDeals, openDeals, totalRevenue, recentActivities] = await Promise.all([
    prisma.contact.count({ where: { companyId } }),
    prisma.deal.count({ where: { companyId } }),
    prisma.deal.count({ where: { companyId, status: 'OPEN' } }),
    prisma.deal.aggregate({
      where: { companyId, status: 'WON' },
      _sum: { amount: true },
    }),
    prisma.activity.findMany({
      where: { companyId },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: true, contact: true },
    }),
  ])

  res.json(
    createSuccessResponse({
      totalContacts,
      totalDeals,
      openDeals,
      totalRevenue: totalRevenue._sum.amount || 0,
      recentActivities,
    }),
  )
})

// Get revenue analytics
router.get('/revenue', async (req: AuthenticatedRequest, res: Response) => {
  const companyId = req.user?.companyId
  const { period = 'month' } = req.query

  const deals = await prisma.deal.findMany({
    where: {
      companyId,
      status: 'WON',
    },
    include: { stage: true },
  })

  res.json(createSuccessResponse({ deals, period }))
})

// Get sales pipeline
router.get('/pipeline', async (req: AuthenticatedRequest, res: Response) => {
  const companyId = req.user?.companyId

  const stages = await prisma.pipelineStage.findMany({
    where: { companyId },
    include: {
      deals: {
        include: { owner: true },
      },
    },
    orderBy: { position: 'asc' },
  })

  res.json(createSuccessResponse(stages))
})

export default router
