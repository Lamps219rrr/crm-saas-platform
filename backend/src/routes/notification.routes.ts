import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Stub routes
router.get('/', (req, res) => res.json({ message: 'Notifications list' }))
router.put('/:id/read', (req, res) => res.json({ message: 'Mark as read' }))

export default router
