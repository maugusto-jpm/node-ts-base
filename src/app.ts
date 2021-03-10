import express from 'express'
import cookieParser from 'cookie-parser'
import 'reflect-metadata'

import bodyParser from 'Middlewares/bodyParser'
import Routes from 'Src/routes'
import checkAuth from 'Middlewares/checkAuth'
import httpErrorHandler from 'Src/handlers/httpErrorHandler'
import pageNotFoundHandler from 'Src/handlers/pageNotFoundHandler'

class AppController {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
    this.handlers()
  }

  private middlewares(): void {
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(bodyParser)
    this.app.use(checkAuth)
  }

  private routes(): void {
    this.app.use(Routes)
  }

  private handlers(): void {
    this.app.use(httpErrorHandler)
    this.app.use(pageNotFoundHandler)
  }
}

export default new AppController().app
