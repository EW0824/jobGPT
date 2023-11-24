import React, { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import JobHistory from "../pages/JobsHistory";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import DetailedJobs from "../pages/DetailedJobs";
import CoverLetters from "../pages/CoverLetters";
import Dashboard from "../pages/Profile";
import { SessionContext } from "./SessionContextProvider";

export default function Navigation() {

    const {sessionToken, setSessionToken} = useContext(SessionContext)

    const PrivateRoute = sessionToken ? (<Outlet />) : (<Navigate to="/sign-in"/>) 

    return (
        <BrowserRouter>
            <Routes>
                <Route path = '/' element={PrivateRoute}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/job-history" element={<JobHistory />} />
                    <Route path="/jobs/:jobId" element={<DetailedJobs />} />
                    <Route path="/cover-letters" element={<CoverLetters />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}
