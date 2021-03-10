import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain, body } from 'express-validator'

export default [
  body('name')
    .isString().withMessage('Name must be provided'),

  body('email')
    .exists()
    .withMessage('E-mail is required')
    .isEmail()
    .withMessage('E-mail must be valid'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 chars long'),

  (req: Request, res: Response, next: NextFunction): Response => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation errors',
        errors: errors.array(),
      })
    }

    next()
  },
] as ValidationChain[]
