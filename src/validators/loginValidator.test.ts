import httpMocks from 'node-mocks-http'
import { validationResult } from 'express-validator'

import testExpressValidatorMiddleware from 'Root/scripts/testExpressValidatorMiddleware'
import loginValidator from './loginValidator'

describe('loginValidator', () => {
  describe('#email', () => {
    describe('when is absent', () => {
      it('return an error', async () => {
        const req  = httpMocks.createRequest({
          body: {
            password: 'password',
          },
        })

        const res = httpMocks.createResponse()

        await testExpressValidatorMiddleware(req, res, loginValidator)
        const results = validationResult(req).array()

        expect(results.length != 0).toBeTruthy()
        expect(
          results.filter(r => r.param == 'email' && r.msg == 'E-mail is required').length,
        ).toEqual(1)
      })
    })

    describe('when is not valid', () => {
      it('return an error', async () => {
        const req  = httpMocks.createRequest({
          body: {
            email: 'email_provider.com',
            password: 'password',
          },
        })

        const res = httpMocks.createResponse()

        await testExpressValidatorMiddleware(req, res, loginValidator)
        const results = validationResult(req).array()

        expect(results.length != 0).toBeTruthy()
        expect(
          results.filter(r => r.param == 'email' && r.msg == 'E-mail must be valid').length,
        ).toEqual(1)
      })
    })

    describe('when is correct', () => {
      it('does not return any error', async () => {
        const req  = httpMocks.createRequest({
          body: {
            email: 'email@provider.com',
            password: 'password',
          },
        })

        const res = httpMocks.createResponse()

        await testExpressValidatorMiddleware(req, res, loginValidator)
        const results = validationResult(req).array()

        expect(results.filter(r => r.param == 'email').length).toEqual(0)
      })
    })
  })

  describe('#password', () => {
    describe('when is absent', () => {
      it('return an error', async () => {
        const req  = httpMocks.createRequest({
          body: {
            email: 'email@provider.com',
          },
        })

        const res = httpMocks.createResponse()

        await testExpressValidatorMiddleware(req, res, loginValidator)
        const results = validationResult(req).array()

        expect(results.length != 0).toBeTruthy()
        expect(
          results.filter(r => r.param == 'password' && r.msg == 'Password is required').length,
        ).toEqual(1)
      })
    })

    describe('when is too short', () => {
      it('return an error', async () => {
        const req  = httpMocks.createRequest({
          body: {
            email: 'email@provider.com',
            password: 'pass',
          },
        })

        const res = httpMocks.createResponse()

        await testExpressValidatorMiddleware(req, res, loginValidator)
        const results = validationResult(req).array()

        expect(results.length != 0).toBeTruthy()
        expect(
          results.filter(
            r => r.param == 'password' &&
            r.msg == 'Password should be at least 5 chars long',
          ).length,
        ).toEqual(1)
      })
    })

    describe('when is correct', () => {
      it('does not return any error', async () => {
        const req  = httpMocks.createRequest({
          body: {
            email: 'email@provider.com',
            password: 'password',
          },
        })

        const res = httpMocks.createResponse()

        await testExpressValidatorMiddleware(req, res, loginValidator)
        const results = validationResult(req).array()

        expect(results.filter(r => r.param == 'password').length).toEqual(0)
      })
    })
  })
})
