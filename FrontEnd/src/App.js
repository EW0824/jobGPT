import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import JobHistory from "./pages/JobsHistory";

export default function App() {
  return (
    <Routes>
      <Route path="/job-history" element={<JobHistory />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}
