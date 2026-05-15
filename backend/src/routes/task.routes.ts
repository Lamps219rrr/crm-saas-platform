import { Router } from 'express'
import { authenticate } from '../middleware/auth'

const router = Router()

router.use(authenticate)

// Stub routes
router.get('/', (req, res) => res.json({ message: 'Tasks list' }))
router.post('/', (req, res) => res.json({ message: 'Create task' }))
router.get('/:id', (req, res) => res.json({ message: 'Get task' }))
router.put('/:id', (req, res) => res.json({ message: 'Update task' }))
router.delete('/:id', (req, res) => res.json({ message: 'Delete task' }))

export default router
