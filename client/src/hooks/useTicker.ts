import React, {useContext} from 'react'
import { useAuth } from '../component/AuthContext'

export const useTicker = () => {
  
  const {user} = useAuth()

  const getStonksByUsername = () => {
    return fetch('/api/stonks', {

    })
  }
}
