import React, { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
})

export const AuthProvider = ({ children }: any) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    status: 'pending',
    user: null,
  })

  useEffect(() => {
    fetch('/api/whoami')
      .then((res) => res.json())
      .then((res) => {
        if (res.user) {
          setState({
            isAuthenticated: true,
            status: 'success',
            user: res.user,
          })
        } else {
          setState({
            isAuthenticated: false,
            status: 'success',
            user: null,
          })
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {state.status === 'pending' ? <div>loading...</div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
