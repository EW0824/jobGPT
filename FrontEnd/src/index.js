import React, {useState} from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./components/Theme";
import SessionContextProvider from "./components/SessionContextProvider";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
  </ThemeProvider>
);
