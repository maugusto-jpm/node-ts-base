import User from 'Models/User'

declare global {
  namespace Express {
    interface Request {
      currentUser: User
    }
  }

  type TokenPayload = {
    name: string,
    email: string,
  }
}
