require('dotenv').config()

const path = require('path')
const express = require('express')
const { asyncHandler } = require('./utils/asyncHandler')
const { cookieParser } = require('./middleware/cookieParser')
import { createSession } from './stores/sessions'
const { sessionMiddleware } = require('./middleware/sessionMiddleware')
const { userMiddleware } = require('./middleware/userMiddleware')
import {
  getStonksByUsername,
  upsertStonk,
  getStonk,
  addNotification,
  getNotificationsByUsername,
} from './stores/internalStonkData'
const { protectedRoute } = require('./middleware/protectedRoute')
const { getStonkPrices, getStonkData } = require('./stores/externalStonkData')
import { getUser, createUser } from './stores/users'
import { connectdb } from './connectdb'
import { createHash } from 'crypto'

import authRouter from './routes/authRoutes'

const showdown = require('showdown')
connectdb()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser)
app.use(sessionMiddleware)
app.use(userMiddleware)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use('/api', authRouter)

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
app.get(
  '/api/notifications',
  protectedRoute,
  asyncHandler(async (req, res) => {
    const username = req.user.username
    const notifications = await getNotificationsByUsername({ username })
    res.json({ notifications })
  }),
)
app.get(
  '/stonks/:ticker',
  asyncHandler(async (req, res) => {
    const ticker = req.params.ticker
    const username = req.user.username
    const stonkData = await getStonkData({ ticker })
    const stonk = await getStonk({ ticker, username })
    const converter = new showdown.Converter()
    const dd = converter.makeHtml(stonk.dd)
    res.render('stonk', { req, stonkData, stonk, dd })
  }),
)
app.get(
  '/stonks/:ticker/upsert',
  asyncHandler(async (req, res) => {
    const ticker = req.params.ticker
    const username = req.user.username
    const stonk = await getStonk({ ticker, username })
    res.render('stonkDDedit', { stonk })
  }),
)

// Post routes
app.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const errors = []
    const loginUsername = req.body.username
    const hashedPw = createHash('sha256')
      .update(req.body.password, 'utf8')
      .digest('base64')
    const userObj = await getUser(loginUsername)
    // validatation
    if (userObj === null) {
      errors.push('user doesnt exist')
    } else if (userObj.password !== hashedPw) {
      errors.push('password is wrong')
    }
    if (errors.length) {
      res.render('login', { errors })
    } else {
      const sessionId = await createSession({ username: loginUsername })
      res.set('Set-Cookie', 'my_app_session=' + sessionId)
      res.redirect('/stonks')
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
    res.redirect('/stonks')
  }),
)

app.post(
  '/stonks',
  protectedRoute,
  asyncHandler(async (req, res) => {
    const ticker = req.body.tickerSymbol
    console.log(`ticker`, ticker)
    const username = req.user.username
    const dd = ''
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
    await upsertStonk({ username, ticker, dd })
    res.redirect('/stonks')
  }),
)

app.post(
  '/upsertDD/:ticker',
  protectedRoute,
  asyncHandler(async (req, res) => {
    const username = req.user.username
    const ticker = req.params.ticker
    const dd = req.body.dd
    await upsertStonk({ username, ticker, dd })
    res.redirect(`/stonks/${ticker}`)
  }),
)

app.post(
  '/addNotification/:ticker',
  protectedRoute,
  asyncHandler(async (req, res) => {
    // TODO: validation
    const username = req.user.username
    const ticker = req.params.ticker
    const notification = req.body
    await addNotification({ username, ticker, ...notification })
    res.redirect(`/stonks/${ticker}`)
  }),
)

app.use(express.static(path.join(__dirname, '/public')))

app.listen(4500, () => {
  console.log('server listening on port 4500')
})
