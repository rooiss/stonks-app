import { useState, useContext } from 'react'
import { AuthContext } from '../component/AuthContext'

// this is a custom hook
// named export, use brackets to import
export const useSignup = () => {
  // store the error state OUTSIDE of the signup function
  const [errors, setErrors] = useState([])

  // store the loading state here too
  const [loading, setLoading] = useState(false)

  const signup = ({ username, password, verifypassword }) => {
    setLoading(true)
    return fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        verifypassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ success, errors, username }) => {
        if (!success) {
          setErrors(errors)
          return
        }
        setErrors([])
        return { username } // <=== placeholder
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return { signup, loading, errors }
}
