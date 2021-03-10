import request from 'supertest'

import app from 'Src/app'

describe('pageNotFoundHandler', () => {
  describe('when requested URL was not found', () => {
    it('returns an error', async () => {
      await request(app)
        .post('/invalid-url')
        .expect(404)
        .expect(res => res.body == 'The requested URL was not found')
    })
  })
})
