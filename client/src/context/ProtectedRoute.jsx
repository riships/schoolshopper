import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ProtectedRoute = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to="/" />;
    return (
        <>
            {/* <Sidebar /> */}
            <Header />
            <div className="page-content">
                <div className="page-content-inner">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default ProtectedRoute;
