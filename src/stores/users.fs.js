const path = require('path')
const { pick } = require('lodash')
const { readFile, writeFile } = require('fs').promises

const filePath = path.resolve(__dirname, './users.json')

const toPublicUser = (userObject) => {
  const parsedObj = pick(userObject, ['username', 'signUpTime', 'password'])
  parsedObj.signUpTime = new Date(parsedObj.signUpTime)
  return parsedObj
}

const getUser = async (username) => {
  const users = await readFile(filePath, 'utf8').then(JSON.parse)
  if (users[username]) {
    return toPublicUser(users[username])
  }
  return null
}
const createUser = async ({ username, password }) => {
  const users = await readFile(filePath, 'utf8').then(JSON.parse)
  // creatingUser
  if (!users[username]) {
    users[username] = {
      username: username,
      password: password,
      signUpTime: new Date(),
    }
    // serialize updated users object
    const newUserData = JSON.stringify(users)
    // write to the file
    await writeFile(filePath, newUserData, 'utf8')
    return toPublicUser(users[username])
  } else {
    throw new Error('username already exists')
  }
}

exports.getUser = getUser
exports.createUser = createUser
