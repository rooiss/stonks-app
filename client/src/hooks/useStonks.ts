import { useState, useCallback, useEffect } from 'react'

export const useStonks = () => {
  const [stonks, setStonks] = useState([])
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(null)
  const fetchStonks = useCallback(() => {
    setLoading(true)
    fetch('/api/stonks')
      .then((res) => res.json())
      .then(({ success, error, stonks }) => {
        if (!success) {
          setError(error)
          return
        }
        setStonks(stonks)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  // when useEffect runs it needs to render with the new stonk that was added
  const addStonk = useCallback((ticker: string) => {
    // this callback is going to add the stonk
    setAdding(true)
    return fetch('/api/stonks', {
      method: 'POST',
      body: JSON.stringify({
        ticker,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(({ stonks, errors }) => {
        if (errors) {
          setError(errors)
          return
        }
        setStonks(stonks)
        // TODO: call setStonks with returned stonk array
        // TODO: set loading to false no matter what the outcome
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchStonks()
  }, [fetchStonks])
  // useEffect
  // call fetch
  // set loading to true
  // on success setStonks
  // on fail setError
  // on finally setLoading
  // dependencies
  return { stonks, loading, adding, error, addStonk }
}
