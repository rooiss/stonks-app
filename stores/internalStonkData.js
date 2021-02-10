const { readFile } = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, './stonks.json')

const upsertDD = async ({ ticker, username }) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      let stonks
      try {
        stonks = JSON.parse(data)
      } catch (e) {
        return reject(e)
      }
      // array.find method returns the first one that matches
      // if dd already exists
      const username_ticker = stonks.find(
        (stonk) => stonk.username === username && stonk.ticker === ticker,
      )
      console.log(`username_ticker`, username_ticker)
      // username_ticker.dd = dd
      const savedStonk = JSON.stringify(stonks)
      writeFile(filePath, savedStonk, 'utf8', (err) => {
        if (err) {
          return reject(err)
        }
        return resolve()
      })
    })
  })
}

const getDD = async ({ ticker, username }) => {
  return new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      let stonks
      try {
        stonks = JSON.parse(data)
      } catch (e) {
        return reject(e)
      }
      const userDD = stonks.find(
        (stonk) => stonk.username === username && stonk.ticker === ticker,
      )
      console.log(`userDD`, userDD)
      return resolve(userDD)
    })
  })
}

exports.upsertDD = upsertDD
exports.getDD = getDD
