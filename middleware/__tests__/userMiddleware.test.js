const { userMiddleware } = require('../userMiddleware')
jest.mock('../../stores/users', () => ({
  getUser: jest.fn().mockResolvedValue({ username: 'foo', password: 'foo' }),
}))
// mockResolvedValue is a spy method and used when needing to return a value wrapped in a promise
// mockedReturnValue causes the spy to return a value synchronously
describe('the user middleware', () => {
  it('attaches the user object to req.user when the session exists', async () => {
    const mockReq = { session: { username: 'foo' } }
    const mockRes = {}
    const mockNext = jest.fn()

    await userMiddleware(mockReq, mockRes, mockNext)
    expect(mockReq.user).toEqual({ username: 'foo', password: 'foo' })
  })
  it('doesnt attach anything to req.user when the session doesnt exist', async () => {
    const mockReq = {}
    const mockRes = {}
    const mockNext = jest.fn()

    await userMiddleware(mockReq, mockRes, mockNext)
    expect(mockReq.user).toBeUndefined()
  })
})
