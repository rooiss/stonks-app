import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
// import { useHistory } from 'react-router'
import { useSignup } from '../hooks/useSignup'

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verifypassword, setVerifypassword] = useState('')

  // const history = useHistory()

  const { signup, errors, loading } = useSignup()

  const handleSignUp = () => {
    signup({
      username,
      password,
      verifypassword,
    }).then(() => {
      // TODO: update authContext with isAuthenticated: true, and username (maybe move this inside of signup)
      // TODO: use react-router to "redirect" the user to some new page
      // something like:
      // history.push('/stonks')
      if (errors.length === 0) {
        // window.location.href = '/stonks'
        console.log('successfully signed up')
      }
    })
  }
  const createInputHandler = (setter) => (e) => {
    setter(e.target.value)
  }
  //  currying
  const handleUsernameChange = createInputHandler(setUsername)
  const handlePasswordChange = createInputHandler(setPassword)
  const handleverifypasswordChange = createInputHandler(setVerifypassword)

  return (
    <div className={classes.root}>
      <h1>Sign Up</h1>
      {loading && <div>LOADING</div>}
      {errors.length ? (
        <>
          {errors.map((eMessage) => (
            <div key={eMessage} style={{ color: 'red' }}>
              {eMessage}
            </div>
          ))}
        </>
      ) : null}
      <form className={classes.signupForm}>
        <label className={classes.signupFormLabel} htmlFor="username">
          username
        </label>
        <input
          className={classes.signupFormInput}
          type="text"
          name="username"
          onChange={handleUsernameChange}
        />
        <label className={classes.signupFormLabel} htmlFor="password">
          password
        </label>
        <input
          className={classes.signupFormInput}
          type="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <label className={classes.signupFormLabel} htmlFor="verifypassword">
          verify password
        </label>
        <input
          className={classes.signupFormInput}
          type="password"
          name="verifypassword"
          onChange={handleverifypasswordChange}
        />
        <button
          className={classes.signupFormBtn}
          type="button"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}
