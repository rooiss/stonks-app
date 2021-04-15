import { createContext } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
  username: null,
  user: {
    deets: 'blah',
    more: 'somesing',
  },
})
