import jwt from 'jsonwebtoken'

import User from 'Src/models/User'

export default (token: string): Promise<User> => {
  const tokenPayload = jwt.verify(token, process.env.APP_KEY) as TokenPayload

  return User.findOne({ email: tokenPayload.email })
}
