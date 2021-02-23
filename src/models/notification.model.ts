import { Schema, model } from 'mongoose'

const NotificationSchema = new Schema({
  username: String,
  ticker: String,
  conditionType: String,
  targetPrice: Number,
  notificationType: String,
})

export const Notification = model('notification', NotificationSchema)
