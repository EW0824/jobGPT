import React, { useContext, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { SessionContext } from "./components/ContextProvider";
import { useFetchAndSetSessionToken } from "./hooks/useFetchSessionToken";

export default function App() {
  const {sessionToken, setSessionToken} = useContext(SessionContext)

  const {loading, error} = useFetchAndSetSessionToken('/auth/get_session', 'GET', setSessionToken)

  return (
      <Navigation isLoggedIn={Boolean(sessionToken?.userId)} loading={loading}/>
  );
}
