const fs = require('fs')
const { getUser, createUser } = require('../users')
const path = require('path')

jest.mock('fs')

describe('the users module', () => {
  describe('createUser', () => {
    it('returns a promise that resolves with the new user object', async () => {
      const user = await createUser({ username: 'rooiss', password: 'rooiss' })
      expect(user.password).toEqual('rooiss')
      expect(user.username).toEqual('rooiss')
      expect(user.signUpTime).toBeInstanceOf(Date)
    })
    it('returns a promise that rejects when the username is already taken', async () => {
      await createUser({ username: 'rooiss2', password: 'rooiss' })
      const user2Promise = createUser({
        username: 'rooiss2',
        password: 'rooiss',
      })
      expect(user2Promise).rejects.toThrow(new Error('username already exists'))
    })
  })
  describe('getUser', () => {
    it('returns a promise that resolves with the user object', async () => {
      await createUser({ username: 'rooiss3', password: 'rooiss3' })
      // toEqual can take an object as an argument and it will
      // call getUser

      const user = await getUser('rooiss3')
      expect(user.username).toEqual('rooiss3')
      expect(user.signUpTime).toBeInstanceOf(Date)
      expect(user.password).toEqual('rooiss3')
    })
    it('returns a promise that resolves with null if the user does not exist', async () => {
      const somesing = await getUser('diamondhands')
      expect(somesing).toBeNull()
    })
  })
})
