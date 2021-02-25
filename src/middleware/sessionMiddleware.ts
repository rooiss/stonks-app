import { getSession } from '../stores/sessions'
const { asyncHandler } = require('../utils/asyncHandler')

export const sessionMiddleware = asyncHandler(async (req, res, next) => {
  const session = await getSession(req.cookies.my_app_session)
  if (session) {
    req.session = session
  }
  next()
})
