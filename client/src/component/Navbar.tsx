import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  mainNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainBrand: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  mainNavUl: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'row',
  },
  mainNavBarLi: {
    minWidth: 130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: 'goldenrod',
    '&:hover': {
      textDecoration: 'none',
      color: 'gold',
    },
  },
})

interface NavbarProps {}
export const Navbar = ({}: NavbarProps) => {
  const classes = useStyles()
  return (
    <div className={classes.mainNav}>
      <h1 className={classes.mainBrand}>Diamondhands.gq 💎 🙌🏻</h1>
      <ul className={classes.mainNavUl}>
        <li className={classes.mainNavBarLi}>
          <Link className={classes.navLink} to="/stonks">
            Stonks
          </Link>
        </li>
        <li className={classes.mainNavBarLi}>
          <Link className={classes.navLink} to="/logout">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  )
}
