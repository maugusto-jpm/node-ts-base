import * as express from 'express'

import ApisController from 'Controllers/api/ApisController'
import HomeLandingPageController from 'Controllers/HomeLandingPageController'

const Router = express.Router()

Router.use('/api', ApisController)

Router.use('/', HomeLandingPageController)

export default Router
