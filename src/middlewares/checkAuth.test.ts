
import httpMocks from 'node-mocks-http'
import { NextFunction } from 'express'
import { Connection } from 'typeorm'

import createDbConnection from 'Src/config/createDbConnection'
import clearDatabase from 'Root/scripts/clearDatabase'
import checkAuth from './checkAuth'

jest.mock('Src/useCases/tokenCreation')
jest.mock('Src/useCases/userRetrievingFromToken')
import tokenCreation from 'Src/useCases/tokenCreation'
import userRetrieving from 'Src/useCases/userRetrievingFromToken'
import userFactory from 'Root/factories/userFactory'
const mockedTokenCreation = tokenCreation as jest.MockedFunction<typeof tokenCreation>
const mockedUserRetrieving = userRetrieving as jest.MockedFunction<typeof userRetrieving>
const next = ((): void => {}) as NextFunction

const req  = httpMocks.createRequest({
  headers: {
    'x-access-token': 'current-access-token',
  },
})
const res = httpMocks.createResponse()
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

describe('checkAuth', () => {
  describe('when token is not valid', () => {
    it('does not change current user from request', async () => {
      mockedUserRetrieving.mockResolvedValue(null)
      await checkAuth(req, res, next)

      expect(mockedUserRetrieving).toHaveBeenCalledWith('current-access-token')
      expect(mockedTokenCreation).not.toBeCalled()
      expect(req.currentUser).toBeUndefined()
    })
  })

  describe('when token is valid', () => {
    it('adds user to request and renew token on response', async () => {
      const user = await userFactory()

      mockedUserRetrieving.mockResolvedValue(user)
      mockedTokenCreation.mockReturnValue('new-access-token')
      await checkAuth(req, res, next)

      expect(mockedUserRetrieving).toHaveBeenCalledWith('current-access-token')
      expect(mockedTokenCreation).toHaveBeenCalledWith(user)
      expect(req.currentUser).toEqual(user)

      const newToken = res?.cookies['X-ACCESS-TOKEN']?.value
      expect(newToken).toEqual('new-access-token')
    })
  })
})
