import React from "react";
import SessionContextProvider from "./components/SessionContextProvider";
import Navigation from "./components/Navigation";

export default function App() {

  return (
    <SessionContextProvider>
      <Navigation />
    </SessionContextProvider>
  );
}
