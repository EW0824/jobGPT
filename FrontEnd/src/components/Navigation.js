import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import JobHistory from "../pages/JobsHistory";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import DetailedJobs from "../pages/DetailedJobs";
import CoverLetters from "../pages/CoverLetters";

export default function Navigation({ isLoggedIn }) {
  const routes = isLoggedIn ? (
    <Routes>
      <Route path="/" element={<CoverLetters />} />
      <Route path="/job-history" element={<JobHistory />} />
      <Route path="/jobs/:jobId" element={<DetailedJobs />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );

  return <BrowserRouter>{routes}</BrowserRouter>;
}
