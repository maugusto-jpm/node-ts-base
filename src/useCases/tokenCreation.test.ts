import { Connection } from 'typeorm'

import createDbConnection from 'Src/config/createDbConnection'
import clearDatabase from 'Root/scripts/clearDatabase'
import tokenCreation from './tokenCreation'

jest.mock('jsonwebtoken')
import { Secret, sign, SignOptions } from 'jsonwebtoken'
import userFactory from 'Root/factories/userFactory'

type functionType = (
  payload: string,
  secretOrPrivateKey: Secret,
  options?: SignOptions
) => string
const mockedSignJwt = sign as jest.MockedFunction<functionType>
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

describe('tokenCreation', () => {
  it('creates token to User', async () => {
    const user = await userFactory()

    mockedSignJwt.mockReturnValue('return-value')
    const token = tokenCreation(user)

    const params = [
      { name: user.name, email: user.email } as TokenPayload,
      process.env.APP_KEY,
      { expiresIn: process.env.WEB_TOKEN_EXPIRATION },
    ]
    expect(mockedSignJwt).toBeCalledWith(...params)
    expect(token).toEqual('return-value')
  })
})
