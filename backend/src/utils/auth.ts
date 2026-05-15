import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h'
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d'

export const passwordUtils = {
  hash: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  },

  compare: async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
  },

  generateResetToken: (): string => {
    return uuidv4()
  },
}

export const jwtUtils = {
  generateToken: (payload: any, expiresIn = JWT_EXPIRY): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn })
  },

  generateRefreshToken: (payload: any): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY })
  },

  verifyToken: (token: string): any => {
    return jwt.verify(token, JWT_SECRET)
  },

  decodeToken: (token: string): any => {
    return jwt.decode(token)
  },
}

export const generateApiKey = (): string => {
  return `sk_${uuidv4().replace(/-/g, '')}`
}
