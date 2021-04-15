import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Navbar } from './component/Navbar'
import { Home } from './component/Home'
import { Login } from './component/Login'
import { Signup } from './component/Signup'

import { createUseStyles } from 'react-jss'
import { AuthContext } from './component/AuthContext'

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,
    flexDirection: 'column',
  },
})

function App() {
  const classes = useStyles()
  const [auth, setAuth] = useState('herro')

  return (
    <AuthContext.Provider value={null}>
      <Router>
        <div className={classes.root}>
          <Navbar />
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
