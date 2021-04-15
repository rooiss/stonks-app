import React, { useContext } from 'react'
import { createUseStyles } from 'react-jss'
import { AuthContext } from './AuthContext'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 800,
      alignItems: 'center',
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column',
    },
    loginFormInput: {
      padding: 10,
      margin: '10px 0 0 0',
      backgroundColor: 'rgb(70, 70, 70)',
      border: 'none',
      fontSize: 'x-large',
      color: 'whitesmoke',
    },
    loginFormLabel: {
      margin: '15px 0 0 0',
    },
    loginFormBtn: {
      margin: '20px 0 0 0',
      border: 'none',
      backgroundColor: 'rgb(92, 92, 92)',
      fontSize: 'x-large',
      color: 'goldenrod',
      transition: 'color 0.5s',
      '&:hover': { cursor: 'pointer', color: 'gold' },
    },
  },
  { name: 'Login' },
)
interface LoginProps {}
export const Login = ({}: LoginProps) => {
  const classes = useStyles()
  const { auth, setAuth } = useContext(AuthContext)

  return (
    <div className={classes.root}>
      <h1>Sign In</h1>
      <form className={classes.loginForm} action="/login" method="POST">
        <label className={classes.loginFormLabel} htmlFor="username">
          username
        </label>
        <input className={classes.loginFormInput} type="text" name="username" />
        <label className={classes.loginFormLabel} htmlFor="password">
          password
        </label>
        <input
          className={classes.loginFormInput}
          type="password"
          name="password"
        />
        <input className={classes.loginFormBtn} type="submit" />
      </form>
    </div>
  )
}
