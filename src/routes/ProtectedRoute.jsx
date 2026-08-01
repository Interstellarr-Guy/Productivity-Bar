import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/authUtils";

export default function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // JWT expired?
    if (isTokenExpired()) {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("email");
        localStorage.removeItem("workspaceId");
        localStorage.removeItem("expiresAt");

        return <Navigate to="/login" replace />;
    }

    return children;
}