import { Request, Response, NextFunction } from 'express'
import tokenCreation from 'Src/useCases/tokenCreation'
import userRetrievingFromToken from 'Src/useCases/userRetrievingFromToken'

export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['x-access-token'] as string

  try {
    const user = await userRetrievingFromToken(token)

    if (!!user) {
      req.currentUser = user
      const newToken = tokenCreation(req.currentUser)
      res.cookie('X-ACCESS-TOKEN', newToken)
    }
  }
  catch (error) { }

  next()
}
