// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom"; // Using React Router for navigation
import { useAuth } from "./AuthContext";

type PrivateRouteProps = {
    children: JSX.Element;
    redirectTo?: string; // Optional prop to specify where to redirect if not authenticated
};

const AdminPrivateRoute: React.FC<PrivateRouteProps> = ({
    children,
    redirectTo = "/admin/sign-in",
}) => {
    const { user, loading } = useAuth(); // Get user and loading state from context

    // If the user data is still loading, show a loading indicator or return null
    if (loading) {
        return <div>Loading...</div>; // or you can return null or a spinner component
    }

    // Once loading is complete, check the user and role
    return user && user.role === "admin" ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    ); // If user exists and role is correct, render children, otherwise redirect
};

export default AdminPrivateRoute;
