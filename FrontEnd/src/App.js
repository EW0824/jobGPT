import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import JobHistory from "./pages/JobsHistory";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import DetailedJobs from "./pages/DetailedJobs";
import CoverLetters from "./pages/CoverLetters";

export default function App() {
  return (
    <Routes>
      <Route path="/job-history" element={<JobHistory />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/jobs/:jobId" element={<DetailedJobs />} />
      <Route path="/cover-letters" element={<CoverLetters />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
