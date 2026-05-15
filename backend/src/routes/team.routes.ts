import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Stub routes
router.get('/', (req, res) => res.json({ message: 'Teams list' }))
router.post('/', (req, res) => res.json({ message: 'Create team' }))
router.get('/:id', (req, res) => res.json({ message: 'Get team' }))
router.put('/:id', (req, res) => res.json({ message: 'Update team' }))
router.delete('/:id', (req, res) => res.json({ message: 'Delete team' }))

export default router
