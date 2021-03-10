import jwt from 'jsonwebtoken'
import { Connection } from 'typeorm'

import createDbConnection from 'Src/config/createDbConnection'
import clearDatabase from 'Root/scripts/clearDatabase'
import userRetrievingFromToken from './userRetrievingFromToken'

jest.mock('jsonwebtoken')
import { verify } from 'jsonwebtoken'
import userFactory from 'Root/factories/userFactory'

type functionType = (token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions
) => TokenPayload
const mockedVerifyJwt = verify as jest.MockedFunction<functionType>
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

describe('userRetrievingFromToken', () => {
  describe('when User is absent', () => {
    it('returns undefined', async () => {
      mockedVerifyJwt.mockReturnValue({ name: 'User Name', email: 'email@provider.com' })
      const userFromToken = await userRetrievingFromToken('token-for-user')

      expect(mockedVerifyJwt).toBeCalledWith('token-for-user', process.env.APP_KEY)
      expect(userFromToken).toBeUndefined()
    })
  })

  describe('when User is present', () => {
    it('returns User for given token', async () => {
      await userFactory({ name: 'User Name', email: 'email@provider.com' })

      mockedVerifyJwt.mockReturnValue({ name: 'User Name', email: 'email@provider.com' })
      const userFromToken = await userRetrievingFromToken('token-for-user')

      expect(mockedVerifyJwt).toBeCalledWith('token-for-user', process.env.APP_KEY)
      expect(userFromToken.name).toEqual('User Name')
      expect(userFromToken.email).toEqual('email@provider.com')
    })
  })
})
