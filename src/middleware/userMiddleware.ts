const { getUser } = require('../stores/users')
const { asyncHandler } = require('../utils/asyncHandler')

export const userMiddleware = asyncHandler(async (req, res, next) => {
  if (req.session) {
    const user = await getUser(req.session.username)
    if (user) {
      req.user = user
    }
  }
  next()
})
