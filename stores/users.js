const { pick } = require('lodash')
const users = {}

const toPublicUser = (userObject) =>
  pick(userObject, ['username', 'signUpTime', 'password'])

const getUser = (username) => {
  // checking to see if username is in the users object
  if (users[username]) {
    return Promise.resolve(toPublicUser(users[username]))
  }
  return Promise.resolve(null)
}
const createUser = ({ username, password }) => {
  // populate the users object with the username as the key
  // the value to that key is the users metadata
  // make sure you return a promise
  if (!users[username]) {
    users[username] = {
      username: username,
      password: password,
      signUpTime: new Date(),
    }
    return Promise.resolve(toPublicUser(users[username]))
  } else {
    return Promise.reject(new Error('username already exists'))
  }
}

exports.getUser = getUser
exports.createUser = createUser
