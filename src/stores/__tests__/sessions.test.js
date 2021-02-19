const { createSession, getSession } = require('../sessions')
const fs = require('fs')

jest.mock('fs')

describe('the session module', () => {
  describe('createSession', () => {
    it('returns a promise that resolves with sessionId', async () => {
      const sessionId = await createSession({
        username: 'rooiss',
      })
      expect(typeof sessionId).toEqual('string')
    })
  })
  describe('getSession', () => {
    it('returns a promise that resolves with the session object', async () => {
      const sessionId = await createSession({ username: 'rooiss2' })
      const fing = await getSession(sessionId)
      expect(fing.username).toEqual('rooiss2')
    })
    it('returns a promise that resolves to null when theres no session', async () => {
      const ting = await getSession('Stonks')
      expect(ting).toBeNull()
    })
  })
})
