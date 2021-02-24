import { Stonk } from '../models/stonk.model'
import { Notification } from '../models/notification.model'

export const getStonksByUsername = async ({ username }) => {
  return await Stonk.find({ username }).exec()
}

export const upsertStonk = async ({ username, ticker, dd }) => {
  const query = { username, ticker }
  return await Stonk.findOneAndUpdate(
    query,
    { username, ticker, dd },
    { upsert: true },
  ).exec()
}

export const getStonk = async ({ ticker, username }): Promise<any> => {
  return await Stonk.findOne({ ticker, username }).exec()
}

export const addNotification = async ({
  ticker,
  username,
  conditionType,
  targetPrice,
  notificationType,
}) => {
  const notification = new Notification({
    username,
    ticker,
    conditionType,
    targetPrice,
    notificationType,
  })
  await notification.save()
}

export const getNotificationsByUsername = async ({ username }) => {
  return await Notification.find({ username }).exec()
}
