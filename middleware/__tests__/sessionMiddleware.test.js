const { sessionMiddleware } = require('../sessionMiddleware')
jest.mock('../../stores/sessions', () => ({
  getSession: jest.fn().mockResolvedValue({ username: 'foo' }),
}))
// mockResolvedValue is a spy method and used when needing to return a value wrapped in a promise
// mockedReturnValue causes the spy to return a value synchronously
describe('the session middleware', () => {
  it('attaches the session to req.session when the cookie exists', async () => {
    const mockReq = { cookies: { my_app_session: '1342542' } }
    const mockRes = {}
    const mockNext = jest.fn()

    await sessionMiddleware(mockReq, mockRes, mockNext)
    expect(mockReq.session).toEqual({ username: 'foo' })
  })
  it('doesnt attach to anything to req.session when the cookie doesnt exist', async () => {
    const mockReq = {}
    const mockRes = {}
    const mockNext = jest.fn()

    await sessionMiddleware(mockReq, mockRes, mockNext)
    expect(mockReq.session).toBeUndefined()
  })
})
