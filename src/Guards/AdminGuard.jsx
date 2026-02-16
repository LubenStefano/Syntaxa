import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Spin } from "antd";


export default function AdminGuard() {
  const { user, loading } = useUser();

  if (loading) {
        return (
            <div style={{ 
                position: "fixed", 
                top: 0, 
                left: 0, 
                width: "100%", 
                height: "100%", 
                backgroundColor: "white", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center" 
            }}>
                <Spin size="large" />
            </div>
        );
    }

  if (!user.validated) {
    return <Navigate to="/" replace />; // Redirect to profile if not validated
  }

  if (!user.admin) {
    return <Navigate to="/" replace />; // Redirect to home if not an admin
  }

  if (user.id !== "85MgtntZ9MYadminIypcE2RRDe17PMU33") {
    return <Navigate to="/" replace />; // Redirect to home if user ID does not match
  }

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if not logged in
  }

  return <Outlet />; // Render the child routes if all conditions are met
}
