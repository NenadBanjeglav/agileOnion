import crypto from 'crypto'

export const createToken = () => crypto.randomBytes(24).toString('base64url')
