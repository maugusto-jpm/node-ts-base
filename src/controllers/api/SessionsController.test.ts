import request from 'supertest'
import { Connection } from 'typeorm'

import createDbConnection from 'Src/config/createDbConnection'
import clearDatabase from 'Root/scripts/clearDatabase'
import userRetrievingFromToken from 'Src/useCases/userRetrievingFromToken'
import app from 'Src/app'
import tokenCreation from 'UseCases/tokenCreation'
import userFactory from 'Root/factories/userFactory'
import User from 'Src/models/User'

let dbConnection: Connection

beforeAll(async () => {
  dbConnection = await createDbConnection
})

afterEach(async () => {
  await clearDatabase(dbConnection)
})

afterAll(async () => {
  await dbConnection.close()
})

describe('SessionController', () => {
  describe('POST /api/sessions', () => {
    describe('when user is absent', () => {
      it('returns an error', async () => {
        const params = {
          email: 'email@provider.com',
          password: 'password',
        }

        await request(app)
          .post('/api/sessions')
          .send(params)
          .expect(400)
      })
    })

    describe('when user is present and password is wrong', () => {
      it('returns an error', async () => {
        const params = {
          email: 'email@provider.com',
          password: 'wrongPassword',
        }

        await userFactory({
          email: 'email@provider.com',
          password: 'password',
        })

        await request(app)
          .post('/api/sessions')
          .send(params)
          .expect(400)
      })
    })

    describe('when user is present and password is correct', () => {
      describe('when params is invalid', () => {
        it('returns an error', async () => {
          await request(app)
            .post('/api/sessions')
            .send({ })
            .expect(400)
        })
      })

      describe('when params is correct', () => {
        it('authenticates user in session', async () => {
          const params = {
            email: 'email@provider.com',
            password: 'password',
          }

          const user = await userFactory({
            email: 'email@provider.com',
            password: 'password',
          })

          let cookies: string[]
          await request(app)
            .post('/api/sessions')
            .send(params)
            .expect(200)
            .expect(res => cookies = Array.from<string>(res.headers['set-cookie']))

          const cookieToken = cookies.find(c => c.startsWith('X-ACCESS-TOKEN='))
          const token = cookieToken.substring(15, cookieToken.indexOf(';'))
          const userFromToken = await userRetrievingFromToken(token)

          expect(user.id).toEqual(userFromToken.id)
        })
      })
    })
  })

  describe('PUT /api/sessions', () => {
    describe('when another user with same email is present', () => {
      it('returns an error', async () => {
        const params = {
          name: 'User Name',
          email: 'email@provider.com',
          password: 'password',
        }

        await userFactory({ email: 'email@provider.com' })

        await request(app)
          .put('/api/sessions')
          .send(params)
          .expect(409)
      })
    })

    describe('when another user with same email is not present', () => {
      describe('when params is invalid', () => {
        it('returns an error', async () => {
          await request(app)
            .put('/api/sessions')
            .send({ })
            .expect(400)
        })
      })

      describe('when params is valid', () => {
        it('stores user and autenticates in session', async () => {
          const params = {
            name: 'User Name',
            email: 'email@provider.com',
            password: 'password',
          }

          let cookies: string[]
          await request(app)
            .put('/api/sessions')
            .set('Content-Type', 'application/json')
            .send(params)
            .expect(200)
            .expect(res => cookies = Array.from<string>(res.headers['set-cookie']))

          const cookieToken = cookies.find(c => c.startsWith('X-ACCESS-TOKEN='))
          const token = cookieToken.substring(15, cookieToken.indexOf(';'))
          const userFromToken = await userRetrievingFromToken(token)
          const user = await User.findOne({ email: 'email@provider.com' })

          expect(user.id).toEqual(userFromToken.id)
          expect(user !== null).toBeTruthy()
          expect(user.name).toBe('User Name')
          expect(user.checkPassword('password')).toBeTruthy()
        })
      })
    })
  })

  describe('DELETE /api/sessions', () => {
    describe('when user is not autenticated', () => {
      it('returns an error', async () => {
        await request(app)
          .delete('/api/sessions')
          .expect(401)
      })
    })

    describe('when user is autenticated', () => {
      it('destroy session', async () => {
        const user = await userFactory()

        const token = tokenCreation(user)

        let cookies: string[]
        await request(app)
          .delete('/api/sessions')
          .set('X-ACCESS-TOKEN', token)
          .expect(200)
          .expect(res => cookies = Array.from<string>(res.headers['set-cookie']))

        const cookieToken = cookies.find(c =>
          c.startsWith('X-ACCESS-TOKEN=') && c.includes('Expires='),
        )

        const expiration = cookieToken.substring(44)
        const date = Date.parse(expiration)
        expect(date).toBeLessThanOrEqual(Date.now())
      })
    })
  })
})
