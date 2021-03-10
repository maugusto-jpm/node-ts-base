import { Request, Response, Router } from 'express'

import User from 'Src/models/User'
import loginValidator from 'Src/validators/loginValidator'
import signinValidator from 'Src/validators/signinValidator'
import tokenCreation from 'UseCases/tokenCreation'
import autenticated from 'Src/middlewares/autenticate'

class SessionsController {
  public router = Router()

  constructor() {
    this.router.post('/', loginValidator, this.login)
    this.router.put('/', signinValidator, this.signin)
    this.router.delete('/', autenticated, this.delete)
  }

  private async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const match = user?.checkPassword(password)

    if (!!!user || !match)
      return res.status(400).json({ message: 'E-mail or password invalid' })

    const token = tokenCreation(user)
    res.cookie('X-ACCESS-TOKEN', token)

    return res.status(200).send()
  }

  private async signin(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })

    if (!!user)
      return res.status(409).json({ message: 'This email is already in use' })

    const newUser = new User()
    newUser.name = name
    newUser.email = email
    newUser.setPassword(password)

    await User.save(newUser)

    const token = tokenCreation(newUser)
    res.cookie('X-ACCESS-TOKEN', token)

    return res.status(200).send()
  }

  private delete(req: Request, res: Response): Response {
    res.cookie('X-ACCESS-TOKEN', '', { expires: new Date(Date.now()) })

    return res.status(200).send()
  }
}

export default new SessionsController().router
