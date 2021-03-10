import { Router } from 'express'

//import autenticate from 'Middlewares/autenticate'
import SessionsController from 'Controllers/api/SessionsController'

class ApisRouter {
  public router = Router()

  constructor() {
    this.router.use('/sessions', SessionsController)

    // Authenticated route
    //this.router.use('/posts', autenticate, PostsController)
  }
}

export default new ApisRouter().router
