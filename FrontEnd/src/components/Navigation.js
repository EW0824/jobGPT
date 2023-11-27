import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import JobHistory from "../pages/JobsHistory";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import DetailedJobs from "../pages/DetailedJobs";
import CoverLetters from "../pages/CoverLetters";
import Dashboard from "../pages/Profile";
import { SessionContext } from "./SessionContextProvider";

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

export default function Navigation() {

    const {sessionToken, setSessionToken} = useContext(SessionContext)

    const {loading, error} = useFetchAndSetSessionToken('http://localhost:8080/auth/get_session','GET', setSessionToken)

    const PrivateRoute = ({ sessionToken }) => {
        console.log("session token", sessionToken)
        return sessionToken ? <Outlet /> : <Navigate to="/sign-in" />;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path = '/' element={<PrivateRoute sessionToken={sessionToken?.user_id} />}>
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
