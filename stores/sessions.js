const sessions = {}

const createSession = ({ username }) => {
  const sessionId = 'session-' + Math.random()
  sessions[sessionId] = {
    username: username,
    loginTime: Date.now(),
  }
  return Promise.resolve(sessionId)
}

const getSession = (sessionId) => {
  if (sessions[sessionId]) {
    return Promise.resolve(sessions[sessionId])
  }
  return Promise.resolve(null)
}

const removeSession = (sessionId) => {}

exports.getSession = getSession
exports.createSession = createSession

// at some point add Max-Age to the session
// max-age limits the time the session exists
// which is why logintime is necessary?

// where am i going to use setSession and getSession in server.js
// understanding that will make my test better
