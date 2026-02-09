import { Navigate, Outlet } from "react-router";
import { useUser } from "../context/UserContext";
import { Spin } from "antd";

export default function AuthGuard() {
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

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
