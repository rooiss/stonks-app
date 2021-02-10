const path = require('path')
const { readFile, writeFile } = require('fs')

const filePath = path.resolve(__dirname, './stonks.json')

const getStonksByUsername = ({ username }) => {
  return new Promise((resolve, reject) => {
    // defining the actual work
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
      return resolve(stonks.filter((stonk) => stonk.username === username))
    })
  })
}

const saveStonk = ({ username, ticker }) => {
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
      stonks.push({ username, ticker })
      const savedStonk = JSON.stringify(stonks)
      writeFile(filePath, savedStonk, 'utf8', (err) => {
        if (err) {
          return reject(err)
        }
        // not passing anything into resolve
        return resolve()
      })
    })
  })
}

exports.saveStonk = saveStonk
exports.getStonksByUsername = getStonksByUsername
