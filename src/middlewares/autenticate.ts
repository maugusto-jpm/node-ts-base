import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const user = req.currentUser

  if (user != null && user != undefined) return next()

  return res.status(401).json({ message: 'User is not authenticated' })
}
