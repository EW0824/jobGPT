import React, { createContext, useState } from 'react'

export const SessionContext = createContext()

export default function ContextProvider({children}) {
    const [sessionToken, setSessionToken] = useState(null)

    return (
        <SessionContext.Provider value={{sessionToken, setSessionToken}}>
            {children}
        </SessionContext.Provider>
    )
}
