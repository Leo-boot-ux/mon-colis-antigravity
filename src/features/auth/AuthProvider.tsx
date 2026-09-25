import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    // Session state is automatically managed and rehydrated 
    // by zustand persist middleware with sessionStorage.
  }, [isAuthenticated, user]);

  return <>{children}</>;
};
