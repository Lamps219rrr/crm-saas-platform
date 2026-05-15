import { Router } from 'express'
import { authenticate } from '../middleware/auth'
import { contactController } from '../controllers/contact.controller'

const router = Router()

// Protect all routes
router.use(authenticate)

// Contact routes
router.get('/', contactController.list)
router.post('/', contactController.create)
router.get('/:id', contactController.get)
router.put('/:id', contactController.update)
router.delete('/:id', contactController.delete)

export default router
