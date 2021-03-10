import jwt from 'jsonwebtoken'

import User from 'Src/models/User'

export default (user: User): string => {
  return jwt.sign(
    { name: user.name, email: user.email } as TokenPayload,
    process.env.APP_KEY,
    { expiresIn: process.env.WEB_TOKEN_EXPIRATION })
}
