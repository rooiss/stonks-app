const protectedRoute = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

exports.protectedRoute = protectedRoute
