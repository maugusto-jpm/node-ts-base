import { Request, Response, Router } from 'express'
import { resolve } from 'path'

class HomeLandingPageRouter {
  public router = Router()

  constructor() {
    this.router.get('/', this.getUserMessage)
  }

  private getUserMessage(req: Request, res: Response): void {
    return res.sendFile('views/HomeLandingPage.html', { root: resolve(__dirname, '../') })
  }
}

export default new HomeLandingPageRouter().router
