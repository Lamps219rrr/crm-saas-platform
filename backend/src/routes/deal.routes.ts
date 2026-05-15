import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Stub routes - implement in full version
router.get('/', (req, res) => res.json({ message: 'Deals list' }))
router.post('/', (req, res) => res.json({ message: 'Create deal' }))
router.get('/:id', (req, res) => res.json({ message: 'Get deal' }))
router.put('/:id', (req, res) => res.json({ message: 'Update deal' }))
router.delete('/:id', (req, res) => res.json({ message: 'Delete deal' }))

export default router
