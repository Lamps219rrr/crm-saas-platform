import app from './app'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, async () => {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✓ Database connected')
    console.log(`✓ Server running on http://localhost:${PORT}`)
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`)
  } catch (error) {
    console.error('✗ Database connection failed:', error)
    process.exit(1)
  }
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
})

export default server
export { prisma }
