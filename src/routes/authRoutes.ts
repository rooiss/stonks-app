import { Router } from 'express'
import { createHash } from 'crypto'

import { asyncHandler } from '../utils/asyncHandler'
import { getUser, createUser } from '../stores/users'
import { createSession } from '../stores/sessions'

const router = Router()

router.post(
  '/login',
  asyncHandler(async (req, res) => {
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
      // res.set('Content-Type', 'application/json').send(JSON.stringify({errors: errors}))
      // this is the short form
      res.json({ errors, success: false })
    } else {
      const sessionId = await createSession({ username: loginUsername })
      res.set('Set-Cookie', 'my_app_session=' + sessionId)
      // res.redirect('/stonks')
      res.json({ username: loginUsername, success: true })
    }
  }),
)

router.post(
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
      res.json({ errors, success: false })
      return
    }
    await createUser({
      username: newUser.username,
      password: newUser.password,
    })
    const sessionId = await createSession({ username: newUser.username })
    res.set('Set-Cookie', 'my_app_session=' + sessionId)
    // res.redirect('/stonks')
    res.json({ username: newUser.username, success: true })
  }),
)

router.get('/whoami', (req, res) => {
  res.json({ user: (req as any).user })
})
export default router
