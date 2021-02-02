const sessions = {}

const setSession = (sessionId) => {}

// to get session you need the req.user
const getSession = () => {}

exports.getSession = getSession
exports.setSession = setSession

// at some point add Max-Age to the session
// max-age limits the time the session exists
// which is why logintime is necessary?
