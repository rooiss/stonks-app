const { cookieParser } = require('../cookieParser')

describe('the cookie parser', () => {
  it('converts the raw cookie header into an object and sets it on the req object, then calls next', () => {
    const mockReq = {
      get: (headerKey) => {
        if (headerKey === 'cookie') {
          return 'my_app_session=12345'
        }
        return undefined
      },
    }
    const mockRes = {}
    const mockNext = jest.fn()

    cookieParser(mockReq, mockRes, mockNext)

    expect(mockReq.cookies).toEqual({
      my_app_session: '12345',
    })
    expect(mockNext).toBeCalled()
  })
})
