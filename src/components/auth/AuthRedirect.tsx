// src/components/Auth/AuthRedirect/index.tsx
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthRedirectProps {
    children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
    const location = useLocation();
    const { isLoading, isAuthenticated } = useAuth();

    // Show nothing while checking authentication
    if (isLoading) {
        return null; // Or loading spinner
    }

    // If user is already authenticated, redirect to the intended page or dashboard
    if (isAuthenticated) {
        const from = (location.state?.from?.pathname as string) || '/app/';
        return <Navigate to={from} replace />;
    }

    return <>{children}</>;
};

export default AuthRedirect;