import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 800,
      alignItems: 'center',
    },
    signupForm: {
      display: 'flex',
      flexDirection: 'column',
    },
    signupFormInput: {
      padding: 10,
      margin: '10px 0 0 0',
      backgroundColor: 'rgb(70, 70, 70)',
      border: 'none',
      fontSize: 'x-large',
      color: 'whitesmoke',
    },
    signupFormLabel: {
      margin: '15px 0 0 0',
    },
    signupFormBtn: {
      margin: '20px 0 0 0',
      border: 'none',
      backgroundColor: 'rgb(92, 92, 92)',
      fontSize: 'x-large',
      color: 'goldenrod',
      transition: 'color 0.5s',
      '&:hover': {
        cursor: 'pointer',
        color: 'gold',
      },
    },
  },
  { name: 'Signup' },
)
interface SignupProps {}
export const Signup = ({}: SignupProps) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Sign Up</h1>
      <form className={classes.signupForm} action="/signup" method="POST">
        <label className={classes.signupFormLabel} htmlFor="username">
          username
        </label>
        <input
          className={classes.signupFormInput}
          type="text"
          name="username"
        />
        <label className={classes.signupFormLabel} htmlFor="password">
          password
        </label>
        <input
          className={classes.signupFormInput}
          type="password"
          name="password"
        />
        <label className={classes.signupFormLabel} htmlFor="verifypassword">
          verify password
        </label>
        <input
          className={classes.signupFormInput}
          type="password"
          name="verifypassword"
        />
        <input className={classes.signupFormBtn} type="submit" />
      </form>
    </div>
  )
}
