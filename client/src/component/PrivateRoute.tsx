import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './AuthContext'

export const PrivateRoute = ({ children, ...rest }: any) => {
  const { isAuthenticated, status } = useAuth()
  return (
    <Route
      {...rest}
      render={
        (/* { location } */) => {
          if (status === 'pending') {
            return <div> Loading........</div>
          }
          if (isAuthenticated) {
            return children
          }
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )
        }
      }
    />
  )
}
