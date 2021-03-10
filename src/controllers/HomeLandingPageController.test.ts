import request from 'supertest'

import app from 'Src/app'

describe('HomeLandingPageController', () => {
  describe('GET /', () => {
    it('returns landing page HTML', async () => {
      await request(app)
        .get('/')
        .expect(200)
        .expect(res => res.text.includes(
          '<h1>Base of a <a href="https://nodejs.org">Node.Js</a> API application made with <a href="https://www.typescriptlang.org/">Typescript</a></h1>',
        ))
    })
  })
})
