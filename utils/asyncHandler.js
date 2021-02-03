exports.asyncHandler = (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch((e) => {
      next(e)
    })
  }
}
