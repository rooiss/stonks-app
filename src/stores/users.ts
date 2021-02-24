import { Document } from 'mongoose'
import { User } from '../models/user.model'

const { pick } = require('lodash')

const toPublicUser = (userObject: Document<any>) => {
  const parsedObj = pick(userObject, ['username', 'signUpTime', 'password'])
  parsedObj.signUpTime = new Date(parsedObj.signUpTime)
  return parsedObj
}

// findOne instead of find?
export const getUser = async (username) => {
  const found = await User.find({ username: username }).exec()
  if (found.length) {
    return toPublicUser(found[0])
  } else {
    return null
  }
}
export const createUser = async ({ username, password }) => {
  const user = new User({
    username: username,
    password: password,
    signUpTime: new Date(),
  })
  return user.save().then(toPublicUser)
}
