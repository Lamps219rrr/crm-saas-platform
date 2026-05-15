import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { createSuccessResponse, createPaginatedResponse } from '../utils/response'
import { AuthenticatedRequest } from '../middleware/auth'

const prisma = new PrismaClient()

export const contactController = {
  // Get all contacts
  list: async (req: AuthenticatedRequest, res: Response) => {
    const { page = 1, limit = 20, search, status, ownerId } = req.query

    const skip = ((Number(page) || 1) - 1) * (Number(limit) || 20)
    const take = Number(limit) || 20

    const where: any = {
      companyId: req.user?.companyId,
    }

    if (search) {
      where.OR = [
        { firstName: { contains: String(search), mode: 'insensitive' } },
        { lastName: { contains: String(search), mode: 'insensitive' } },
        { email: { contains: String(search), mode: 'insensitive' } },
      ]
    }

    if (status) where.status = String(status)
    if (ownerId) where.ownerId = String(ownerId)

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take,
        include: { owner: true, deals: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count({ where }),
    ])

    res.json(createPaginatedResponse(contacts, Number(page), take, total))
  },

  // Get single contact
  get: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params

    const contact = await prisma.contact.findUniqueOrThrow({
      where: { id },
      include: {
        owner: true,
        deals: true,
        activities: true,
        tasks: true,
        meetings: true,
        notes: true,
        emails: true,
      },
    })

    res.json(createSuccessResponse(contact))
  },

  // Create contact
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { email, firstName, lastName, ...data } = req.body

    const contact = await prisma.contact.create({
      data: {
        email,
        firstName,
        lastName,
        companyId: req.user?.companyId!,
        ownerId: req.user?.id!,
        ...data,
      },
      include: { owner: true },
    })

    res.status(201).json(createSuccessResponse(contact, 'Contact created'))
  },

  // Update contact
  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params

    const contact = await prisma.contact.update({
      where: { id },
      data: req.body,
      include: { owner: true },
    })

    res.json(createSuccessResponse(contact, 'Contact updated'))
  },

  // Delete contact
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params

    await prisma.contact.delete({
      where: { id },
    })

    res.json(createSuccessResponse(null, 'Contact deleted'))
  },
}
