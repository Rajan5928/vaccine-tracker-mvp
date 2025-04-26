import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';
import Profile from './components/Patient/Profile';
// import Login from './components/Auth/Login';
// import PatientDashboard from './components/Patient/Dashboard';
// import ProviderDashboard from './components/Provider/Dashboard';
// import ProtectedRoute from './components/Shared/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/patient/profile" element={<Profile />} />
      {/* <Route path="/login" element={<Login />} /> */}

      {/* Protected routes */}
      {/* <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute role="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      /> */}
      {/* <Route
        path="/provider/dashboard"
        element={
          <ProtectedRoute role="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      /> */}

      {/* Catch-all or redirect route can be added here if needed */}
    </Routes>
  );
};

export default App;
