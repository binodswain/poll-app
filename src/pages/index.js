import React from "react";
import { Routes, Route, NavLink, Link, Navigate } from "react-router-dom";
import Homepage from "./homepage/homepage";
import Dashboard from "./dashboard/dashboard";
import QuestionDetails from "./questions/questions";
import Leaderboard from "./leaderboard/leaderboard";
import AddQuestion from "./add/add";
import Login from "./login/login";
import { useAuth } from "../hooks/useAuth";
import NotFound from "./error/404";

import { ProtectedLayout } from "../components/ProtectedLayout";

export default function App() {
    const user = useAuth();

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <ProtectedLayout>
                            <Homepage />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/question/:id"
                    element={
                        <ProtectedLayout>
                            <QuestionDetails />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/leaderboard"
                    element={
                        <ProtectedLayout>
                            <Leaderboard />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path="/add"
                    element={
                        <ProtectedLayout>
                            <AddQuestion />
                        </ProtectedLayout>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
