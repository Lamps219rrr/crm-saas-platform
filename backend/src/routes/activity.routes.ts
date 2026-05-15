import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Stub routes
router.get('/', (req, res) => res.json({ message: 'Activities list' }))
router.post('/', (req, res) => res.json({ message: 'Create activity' }))
router.get('/:id', (req, res) => res.json({ message: 'Get activity' }))

export default router
