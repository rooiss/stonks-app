require('dotenv').config()

const express = require('express')
const { asyncHandler } = require('./utils/asyncHandler')
const { cookieParser } = require('./middleware/cookieParser')
const { createSession, getSession } = require('./stores/sessions')
const { createUser, getUser } = require('./stores/users')
const { sessionMiddleware } = require('./middleware/sessionMiddleware')
const { userMiddleware } = require('./middleware/userMiddleware')
const { saveStonk, getStonksByUsername } = require('./stores/stonks')
const { protectedRoute } = require('./middleware/protectedRoute')
const { getStonkPrices } = require('./stores/stonkData')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser)
app.use(sessionMiddleware)
app.use(userMiddleware)

app.set('view engine', 'ejs')

// Get routes
app.get('/', (req, res) => {
  res.render('index', { req })
})

app.get('/signup', (req, res) => {
  res.render('signup', { errors: [] })
})

app.get('/login', (req, res) => {
  res.render('login', { errors: [] })
})

app.get(
  '/stonks',
  protectedRoute,

  asyncHandler(async (req, res) => {
    const username = req.user.username
    const stonks = await getStonksByUsername({ username })
    res.render('stonks', { stonks, errors: [] })
  }),
)
app.get('/logout', (req, res) => {
  res.set('Set-Cookie', `my_app_session=; Expires=${Date.now()}`)
  res.redirect('/')
})
app.get(
  '/api/stonks',
  protectedRoute,
  asyncHandler(async (req, res) => {
    const username = req.user.username
    const stonks = await getStonksByUsername({ username })
    const prices = await getStonkPrices({ tickers: stonks })
    res.json({
      stonks: prices,
    })
  }),
)

// Post routes
app.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    // check username and password
    const errors = []
    const loginUsername = req.body.username
    const userObj = await getUser(loginUsername)
    // if getUser returns null then error message
    // if getUser password doesn't match return error
    if (userObj === null) {
      errors.push('user doesnt exist')
    }
    if (userObj !== null && userObj.password !== req.body.password) {
      errors.push('password is wrong')
    }
    if (errors.length) {
      res.render('login', { errors })
    } else if (
      userObj.username === loginUsername &&
      userObj.password === req.body.password
    ) {
      const sessionId = await createSession({ username: loginUsername })
      res.set('Set-Cookie', 'my_app_session=' + sessionId)
      res.redirect('/')
    }
  }),
)

app.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const newUser = req.body
    const errors = []

    if (newUser.username === '') {
      errors.push('fill in username')
    }
    if (newUser.password === '') {
      errors.push('fill in password')
    }
    if (newUser.password !== newUser.verifypassword) {
      errors.push('passwords need to match')
    }
    if (await getUser(newUser.username)) {
      errors.push('username already exists')
    }
    if (errors.length) {
      res.render('signup', { errors })
    }
    await createUser({
      username: newUser.username,
      password: newUser.password,
    })
    const sessionId = await createSession({ username: newUser.username })
    res.set('Set-Cookie', 'my_app_session=' + sessionId)
    res.redirect('/')
  }),
)

app.post(
  '/stonks',
  protectedRoute,
  asyncHandler(async (req, res) => {
    const ticker = req.body.tickerSymbol
    const username = req.user.username
    const errors = []
    const stonks = await getStonksByUsername({ username })
    if (ticker === '') {
      errors.push('cant leave ticker blank')
    }
    if (errors.length) {
      return res.render('stonks', { stonks, errors })
      // have to have a return statement for the render if there is another render
      // conditional statements need return if you want control flow to end
    }
    await saveStonk({ username, ticker })
    res.redirect('/stonks')
  }),
)

app.use(express.static('public'))

app.listen(4500, () => {
  console.log('server listening on port 4500')
})

// where does createSession need to be implemented
// post login and post sign up
