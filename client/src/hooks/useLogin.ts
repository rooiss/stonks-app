import { useState } from 'react'

// this is a custom hook
// named export, use brackets to import
export const useLogin = () => {
  // store the error state OUTSIDE of the signup function

  // store the loading state here too
  const [loading, setLoading] = useState(false)

  const login = ({ username, password }) => {
    setLoading(true)
    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ success, errors, username }) => {
        setLoading(false)
        if (!success) {
          return Promise.reject(errors)
        }
        return { username } // <=== placeholder
      })
  }
  return { login, loading }
}
