const path = require('path')
const { pick } = require('lodash')
const { readFile, writeFile } = require('fs')

const filePath =
  process.env.NODE_ENV === 'test'
    ? path.resolve(__dirname, './__fixtures__/users.test.json')
    : path.resolve(__dirname, './users.json')

const toPublicUser = (userObject) => {
  const parsedObj = pick(userObject, ['username', 'signUpTime', 'password'])
  parsedObj.signUpTime = new Date(parsedObj.signUpTime)
  return parsedObj
}

const getUser = (username) => {
  // checking to see if username is in the users object
  return new Promise((resolve, reject) => {
    // read file
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      // parse
      let users
      try {
        users = JSON.parse(data)
      } catch (e) {
        return reject(e)
      }
      // getUser
      if (users[username]) {
        return resolve(toPublicUser(users[username]))
      }
      return resolve(null)
    })
  })
}
const createUser = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      // parse
      let users
      try {
        users = JSON.parse(data)
      } catch (e) {
        return reject(e)
      }
      // creatingUser
      if (!users[username]) {
        users[username] = {
          username: username,
          password: password,
          signUpTime: new Date(),
        }
        console.log(`users[username]`, users[username])
        // serialize updated users object
        const newUserData = JSON.stringify(users)
        // write to the file
        writeFile(filePath, newUserData, 'utf8', (err) => {
          if (err) {
            return reject(err)
          }
          return resolve(toPublicUser(users[username]))
        })
      } else {
        return reject(new Error('username already exists'))
      }
    })
  })
}

exports.getUser = getUser
exports.createUser = createUser
