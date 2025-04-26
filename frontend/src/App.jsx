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
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/register" style={styles.navLink}>Register</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Login</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/patient/profile" style={styles.navLink}>Profile</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/patient/vaccine-list" style={styles.navLink}>Vaccine List</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/provider/patient-details" style={styles.navLink}>Patient Details</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/provider/patient-list" style={styles.navLink}>Patient List</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink} onClick={() => localStorage.clear('role') } >Logout</Link>
          </li>
        </ul>
      </nav>

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

// Inline styles for the navigation bar
const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default App;