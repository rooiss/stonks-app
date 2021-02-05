// check cookies for specific value my_app_session
// this is only saying if sessions[my_app_session] exists then adds user obj
// if the session exists assign req.user to the user objects
const { getSession } = require('../stores/sessions')
const { asyncHandler } = require('../utils/asyncHandler')

const userObj = asyncHandler(async (req, res, next) => {
  if (await getSession(req.cookies.my_app_session)) {
    req.user = await getSession(req.cookies.my_app_session)
  }
  next()
})

exports.userObj = userObj
