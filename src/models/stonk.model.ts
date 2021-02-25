import { Schema, model } from 'mongoose'

const StonkSchema = new Schema({
  username: String,
  ticker: String,
  dd: String,
})

export const Stonk = model('stonk', StonkSchema)
