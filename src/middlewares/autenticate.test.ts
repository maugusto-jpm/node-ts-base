import httpMocks from 'node-mocks-http'
import { Connection } from 'typeorm'

import createDbConnection from 'Src/config/createDbConnection'
import clearDatabase from 'Root/scripts/clearDatabase'
import autenticate from './autenticate'
import userFactory from 'Root/factories/userFactory'

const req  = httpMocks.createRequest()
const res = httpMocks.createResponse()

const next = ((): void => {})
const mockedNext = jest.fn(next)
const mockedStatus = jest.fn(res.status)
res.status = mockedStatus
const mockedJson = jest.fn(res.json)
res.json = mockedJson

let dbConnection: Connection

beforeAll(async () => {
  dbConnection = await createDbConnection
})

afterEach(async () => {
  await clearDatabase(dbConnection)
})

afterAll(async () => {
  jest.clearAllMocks()
  await dbConnection.close()
})

describe('autenticate', () => {
  describe('when user is not logged', () => {
    it('calls next with error code', async () => {
      req.currentUser = undefined

      await autenticate(req, res, mockedNext)

      expect(mockedStatus).toHaveBeenCalledWith(401)
      expect(mockedJson).toHaveBeenCalledWith({ message: 'User is not authenticated' })
      expect(mockedNext).not.toHaveBeenCalled()
    })
  })

  describe('when user is logged', () => {
    it('calls next without error', async () => {
      const user = await userFactory()

      req.currentUser = user
      await autenticate(req, res, mockedNext)

      expect(mockedNext).toHaveBeenCalledWith()
    })
  })
})
