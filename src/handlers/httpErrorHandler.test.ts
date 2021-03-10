import httpMocks from 'node-mocks-http'
import HttpErrors from 'http-errors'
import httpErrorHandler from './httpErrorHandler'

const req  = httpMocks.createRequest()
const res = httpMocks.createResponse()
const next = (): void => {}

const mockedResponseStatus = jest.spyOn(res, 'status')
const mockedResponseSend = jest.spyOn(res, 'send')

beforeAll(() => {
  jest.spyOn(global.console, 'error')
  global.console.error = jest.fn(console.error).mockImplementation()
})

afterAll(() => {
  jest.clearAllMocks()
})

describe('httpErrorHandler', () => {
  describe('when error is not from server', () => {
    it('does not outputs to console and sets status code and message to request', async () => {
      const error = HttpErrors(456, 'Error message', {
        code: 'ERROR_MESSAGE',
      })

      httpErrorHandler(error, req, res, next)
      expect(console.error).not.toHaveBeenCalled()
      expect(mockedResponseStatus).toHaveBeenCalledWith(456)
      expect(mockedResponseSend).toHaveBeenCalledWith({ message: 'Error message' })
    })
  })

  describe('when error is from server', () => {
    it('does outputs to console and sets status code and message to request', async () => {
      const error500 = HttpErrors(500, 'Server error 500 message', {
        code: 'SERVER_ERROR_MESSAGE',
      })

      httpErrorHandler(error500, req, res, next)
      expect(console.error).toHaveBeenCalledWith(error500)
      expect(mockedResponseStatus).toHaveBeenCalledWith(500)
      expect(mockedResponseSend).toHaveBeenCalledWith({ message: 'Server error 500 message' })

      const error550 = HttpErrors(550, 'Server error 550 message', {
        code: 'SERVER_ERROR_MESSAGE',
      })

      httpErrorHandler(error550, req, res, next)
      expect(console.error).toHaveBeenCalledWith(error550)
      expect(mockedResponseStatus).toHaveBeenCalledWith(550)
      expect(mockedResponseSend).toHaveBeenCalledWith({ message: 'Server error 550 message' })

      const error599 = HttpErrors(599, 'Server error 599 message', {
        code: 'SERVER_ERROR_MESSAGE',
      })

      httpErrorHandler(error599, req, res, next)
      expect(console.error).toHaveBeenCalledWith(error599)
      expect(mockedResponseStatus).toHaveBeenCalledWith(599)
      expect(mockedResponseSend).toHaveBeenCalledWith({ message: 'Server error 599 message' })
    })
  })
})
