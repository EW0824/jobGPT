import {useState, useEffect} from 'react'

export const useFetchAndSetSessionToken = (url, method, setToken) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: method,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                })
                const result = await response.json()
                setToken(result)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
  
        fetchData()
    }, [url])
  
    return {loading, error}
}