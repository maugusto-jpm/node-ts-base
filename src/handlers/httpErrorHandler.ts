import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'

// eslint-disable-next-line prefer-const
let serverErrorCodes: number[] = []
for (let i = 500; i <= 599; i++) serverErrorCodes.push(i)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: HttpError, req: Request, res: Response, next: NextFunction): Response => {
  if (serverErrorCodes.includes(error.status))
    console.error(error)

  return res.status(error.status).send({ message: error.message })
}
