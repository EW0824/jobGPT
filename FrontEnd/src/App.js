import React, { useContext, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { SessionContext } from "./components/SessionContextProvider";

const useFetchAndSetSessionToken = (url, method, setToken) => {
  const [loading, setLoading] = useState(null)
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

export default function App() {
  const {sessionToken, setSessionToken} = useContext(SessionContext)

  const {loading, error} = useFetchAndSetSessionToken('/auth/get_session', 'GET', setSessionToken)

  return (
      <Navigation isLoggedIn={Boolean(sessionToken?.userId)}/>
  );
}
