// check cookies for specific value my_app_session
//
import { getSession } from '../stores/sessions'
const { asyncHandler } = require('../utils/asyncHandler')

const sessionMiddleware = asyncHandler(async (req, res, next) => {
  const session = await getSession(req.cookies.my_app_session)
  if (session) {
    req.session = session
  }
  next()
})

exports.sessionMiddleware = sessionMiddleware
