export const asyncHandler = (handler) => {
  return async (req, res, next) => {
    return handler(req, res, next).catch((e) => {
      next(e)
    })
  }
}
