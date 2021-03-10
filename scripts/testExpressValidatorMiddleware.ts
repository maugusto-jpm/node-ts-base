import { Request, Response } from 'express'
import { ValidationChain } from 'express-validator'

export default async (req: Request, res: Response, validator: ValidationChain[]): Promise<void> => {
  await Promise.all(
    validator.map(async v => v(req, res, () => undefined)),
  )
}
