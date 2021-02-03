const express = require('express')
const { asyncHandler } = require('./utils/asyncHandler')
const { cookieParser } = require('./middleware/cookieParser')
const { createSession, getSession } = require('./stores/sessions')
const { createUser, getUser } = require('./stores/users')
const { userObj } = require('./middleware/userObj')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser)
app.use(userObj)
app.set('view engine', 'ejs')

// Get routes
app.get('/', (req, res) => {
  res.render('index', { req })
})

app.get('/signup', (req, res) => {
  res.render('signup', { errors: [] })
})

app.get('/login', (req, res) => {
  res.render('login')
})

// Post routes
app.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    // check username and password
    const userObj = await getUser(req.body.username)
    if (
      userObj.username === req.body.username &&
      userObj.password === req.body.password
    ) {
      createSession({ sessionId, username: req.body.username })
      res.redirect('/')
    }
    // take err and render it?
    //
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
    await createUser(newUser.username, {
      username: newUser.username,
      password: newUser.password,
    })
    const sessionId = await createSession({ username: newUser.username })
    // console.log('sessionId:', sessionId)
    res.set('Set-Cookie', 'my_app_session=' + sessionId)
    res.redirect('/')
  }),
)

app.post('/logout', (req, res) => {
  delete req.user
  res.redirect('/')
})

app.listen(4500, () => {
  console.log('server listening on port 4500')
})

// where does createSession need to be implemented
// post login and post sign up
