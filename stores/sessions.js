const path = require('path')
const { readFile, writeFile } = require('fs')

const sessionFilePath = path.resolve(__dirname, './sessions.json')

const createSession = ({ username }) => {
  return new Promise((resolve, reject) => {
    readFile(sessionFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      // parse
      let sessions
      try {
        sessions = JSON.parse(data)
      } catch (e) {
        return reject(e)
      }
      // create user
      const sessionId = 'session-' + Math.random()
      sessions[sessionId] = {
        username: username,
        loginTime: Date.now(),
      }
      // serialize updated sessions object
      const newSessionsData = JSON.stringify(sessions)
      writeFile(sessionFilePath, newSessionsData, 'utf8', (err) => {
        if (err) {
          return reject(err)
        }
        return resolve(sessionId)
      })
    })
  })
}

const getSession = (sessionId) => {
  return new Promise((resolve, reject) => {
    readFile(sessionFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      let sessions
      try {
        sessions = JSON.parse(data)
      } catch (e) {
        return reject(e)
      }
      // get session
      if (sessions[sessionId]) {
        return resolve(sessions[sessionId])
      }
      return resolve(null)
    })
  })
}

exports.getSession = getSession
exports.createSession = createSession

// at some point add Max-Age to the session
// max-age limits the time the session exists
// which is why logintime is necessary?

// where am i going to use setSession and getSession in server.js
// understanding that will make my test better
