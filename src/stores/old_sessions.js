const path = require('path')
const { readFile, writeFile } = require('fs').promises

const sessionFilePath = path.resolve(__dirname, './sessions.json')

const createSession = async ({ username }) => {
  const sessions = await readFile(sessionFilePath, 'utf8').then(JSON.parse)
  // create session
  const sessionId = 'session-' + Math.random()
  sessions[sessionId] = {
    username: username,
    loginTime: Date.now(),
  }
  // serialize updated sessions object
  const newSessionsData = JSON.stringify(sessions)
  await writeFile(sessionFilePath, newSessionsData, 'utf8')
  return sessionId
}

const getSession = async (sessionId) => {
  const sessions = await readFile(sessionFilePath, 'utf8').then(JSON.parse)
  // get session
  if (sessions[sessionId]) {
    return sessions[sessionId]
  }
  return null
}

exports.getSession = getSession
exports.createSession = createSession

// at some point add Max-Age to the session
// max-age limits the time the session exists
// which is why logintime is necessary?

// where am i going to use setSession and getSession in server.js
// understanding that will make my test better
