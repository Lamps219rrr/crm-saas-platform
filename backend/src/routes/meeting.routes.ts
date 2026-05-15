import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Stub routes
router.get('/', (req, res) => res.json({ message: 'Meetings list' }))
router.post('/', (req, res) => res.json({ message: 'Create meeting' }))
router.get('/:id', (req, res) => res.json({ message: 'Get meeting' }))
router.put('/:id', (req, res) => res.json({ message: 'Update meeting' }))
router.delete('/:id', (req, res) => res.json({ message: 'Delete meeting' }))

export default router
