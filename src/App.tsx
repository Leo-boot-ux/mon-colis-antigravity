import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/public/HomePage';
import LoginPage from '@/pages/public/LoginPage';
import DashboardPage from '@/pages/client/DashboardPage';
import DriverDashboardPage from '@/pages/driver/DriverDashboardPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['client']}>
          <AppLayout><DashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/driver" element={
        <ProtectedRoute allowedRoles={['driver']}>
          <AppLayout><DriverDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/agent" element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AppLayout><AdminDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AppLayout><AdminDashboardPage /></AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
