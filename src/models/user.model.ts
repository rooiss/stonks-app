import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  username: String,
  password: String,
  signUpTime: Date,
})

export const User = model('user', UserSchema)
