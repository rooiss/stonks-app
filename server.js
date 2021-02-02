const express = require('express')
const { cookieParser } = require('./middleware/cookieParser')
const { setSession, getSession } = require('./stores/sessions')
const { setUser, getUser } = require('./stores/users')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser)
app.set('view engine', 'ejs')

// Get routes
app.get('/', (req, res) => {
  // if user is not logged in then reroute to signup
  res.render('index')
})

app.get('/signup', (req, res) => {
  res.render('signup', { errors: [] })
})

app.get('/login', (req, res) => {
  res.render('login')
})

// Post routes
app.post('/login', (req, res) => {
  // check username and password
  const { username, password } = req.body
  if (username)
    // call setSession
    // can use redirect with set-cookie
    res.set('Set-Cookie', 'my_app_session=' + sessionId)
  res.redirect('/')
})

app.post('/signup', (req, res) => {
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
  if (getUser(newUser.username)) {
    errors.push('username already exists')
  }
  if (errors.length) {
    res.render('signup', { errors })
  }
  setUser(newUser.username, {
    username: newUser.username,
    password: newUser.password,
  })
  const sessionId = 'session-' + Math.random()
  setSession(sessionId, newUser.username)
  res.set('Set-Cookie', 'my_app_session=' + sessionId, 'Max-Age=' + 500)
  res.render('index')
})

app.listen(4500, () => {
  console.log('server listening on port 4500')
})

// cookie parser
