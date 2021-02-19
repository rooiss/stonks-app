const path = require('path')
const { readFile, writeFile } = require('fs').promises

const filePath = path.resolve(__dirname, './stonks.json')
const notificationFilePath = path.resolve(__dirname, './notifications.json')

const getStonksByUsername = async ({ username }) => {
  const stonks = await readFile(filePath, 'utf8').then(JSON.parse)
  return stonks.filter((stonk) => stonk.username === username)
}

const saveStonk = async ({ username, ticker, dd }) => {
  const stonks = await readFile(filePath, 'utf8').then(JSON.parse)
  stonks.push({ username, ticker, dd })
  const savedStonk = JSON.stringify(stonks)
  await writeFile(filePath, savedStonk, 'utf8')
  return

  // return new Promise((resolve, reject) => {
  //   readFile(filePath, 'utf8', (err, data) => {
  //     if (err) {
  //       return reject(err)
  //     }
  //     let stonks
  //     try {
  //       stonks = JSON.parse(data)
  //     } catch (e) {
  //       return reject(e)
  //     }
  //     // add dd here but make it null or empty string
  //     stonks.push({ username, ticker, dd })
  //     const savedStonk = JSON.stringify(stonks)
  //     console.log(`savedStonk`, savedStonk)
  //     writeFile(filePath, savedStonk, 'utf8', (err) => {
  //       if (err) {
  //         return reject(err)
  //       }
  //       // not passing anything into resolve
  //       return resolve()
  //     })
  //   })
  // })
}

const getStonk = async ({ ticker, username }) => {
  const stonks = await readFile(filePath, 'utf8').then(JSON.parse)
  const stonk = stonks.find(
    (stonk) => stonk.username === username && stonk.ticker === ticker,
  )
  return stonk
}

const upsertDD = async ({ username, ticker, dd }) => {
  const stonks = await readFile(filePath, 'utf8').then(JSON.parse)
  const stonk = stonks.find(
    (stonk) => stonk.username === username && stonk.ticker === ticker,
  )
  stonk.dd = dd
  const savedStonk = JSON.stringify(stonks)
  await writeFile(filePath, savedStonk, 'utf8')
  return
}

/**
 * 
 * @param {{
  ticker: string;
  username: string;
  notification: {
    conditionType: 'lte' | 'gte';
    notificationType: 'txt' | 'email';
    price: number;
  }
}} param0 
 */
const addNotification = async ({ ticker, username, notification }) => {
  const notifications = await readFile(notificationFilePath, 'utf8').then(
    JSON.parse,
  )
  notifications.push({
    ticker,
    username,
    ...notification,
  })
  await writeFile(notificationFilePath, JSON.stringify(notifications), 'utf8')
  return
}

const getNotificationsByUsername = async ({ username }) => {
  const notifications = await readFile(notificationFilePath, 'utf8').then(
    JSON.parse,
  )
  return notifications.filter(
    (notification) => notification.username === username,
  )
}

exports.upsertDD = upsertDD
exports.saveStonk = saveStonk
exports.getStonksByUsername = getStonksByUsername
exports.getStonk = getStonk
exports.addNotification = addNotification
exports.getNotificationsByUsername = getNotificationsByUsername
