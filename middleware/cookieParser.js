const cookieParser = (req, res, next) => {
  if (!req.header.cookies) {
    cookies = {}
  }

  next()
}
exports.cookieParser = cookieParser
