const cookieParser = (req, res, next) => {
  let cookies = {}
  const rawCookiesHeader = req.get('cookie')
  if (rawCookiesHeader) {
    const cookieObj = {}
    rawCookiesHeader
      .split(';')
      .map((cookie) => cookie.trim(''))
      .forEach((cookie) => {
        const pairs = cookie.split('=')
        const key = pairs[0]
        const val = pairs[1]
        cookieObj[key] = val
        return cookieObj
      })
    cookies = cookieObj
  }
  // if req.header.cookies doesnt exist then create the cookies object
  // use split to get each singular cookie
  // use map to go over each cookie in the new array by split
  // trim white space on each cookie
  req.cookies = cookies
  next()
}
exports.cookieParser = cookieParser

// what does cookieparser do
// first looks at req.header.cookies if that isnt set then it creates the object cookies
// if it does exist then we need to take the string from req.header.cookies and parse it
//
