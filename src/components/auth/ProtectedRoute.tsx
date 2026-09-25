import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect based on role if unauthorized for this path
    switch (user.role) {
      case 'admin': return <Navigate to="/admin" replace />;
      case 'driver': return <Navigate to="/driver" replace />;
      case 'agent': return <Navigate to="/agent" replace />;
      default: return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
