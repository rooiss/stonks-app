import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'
interface HomeProps {}
const useStyles = createUseStyles({
  indexLoginLinks: {
    textDecoration: 'none',
    color: 'goldenrod',
    transition: 'color 0.5s',
    '&:hover': {
      color: 'gold',
    },
  },
})

export const Home = ({}: HomeProps) => {
  const classes = useStyles()
  const { user } = useAuth()
  return (
    <div>
      <h1>A stock app to learn.</h1>
      {user ? (
        <div>{user.username}</div>
      ) : (
        <>
          <p>
            <Link className={classes.indexLoginLinks} to="/login">
              Login here, diamond hands
            </Link>
          </p>

          <p>
            <Link className={classes.indexLoginLinks} to="/signup">
              Sign up, paper hands
            </Link>
          </p>
        </>
      )}
    </div>
  )
}
