import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';
import Profile from './components/Patient/Profile';
import VaccineList from './components/Patient/VaccineList';
import PatientDetails from './components/Provider/PatientDetails';
import PatientList from './components/Provider/PatientList';
// import PatientDashboard from './components/Patient/Dashboard';
// import ProviderDashboard from './components/Provider/Dashboard';
// import ProtectedRoute from './components/Shared/ProtectedRoute';

const App = () => {
  return (
    <div>
      {/* Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/patient/profile" element={<Profile />} />
        <Route path="/patient/vaccine-list" element={<VaccineList />} />
        <Route path="/provider/patient-details" element={<PatientDetails />} />
        <Route path="/provider/patient-list" element={<PatientList />} />

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
    </div>
  );
};

export default App;