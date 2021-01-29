const { pick } = require('lodash')
const users = {}

const getUser = () => {}
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
    return Promise.resolve(pick(users[username], ['username', 'signUpTime']))
  } else {
    return Promise.reject('username already exists')
  }
}
const updateUser = () => {}

exports.getUser = getUser
exports.createUser = createUser
exports.updateUser = updateUser
