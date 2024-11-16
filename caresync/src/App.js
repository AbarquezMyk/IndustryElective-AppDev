import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import PaymentMethods from './components/PaymentMethod';
import Calendar from './components/Calendar';
import OnlineForm from './components/OnlineForm';
import Patient from './components/Patient';
import PatientProfileForm from './components/PatientProfileForm';
import CreditCard from './components/CreditCard';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentHistory from './components/AppointmentHistory';
import AppointmentHistoryForm from './components/AppointmentHistoryForm';
import Doctor from './components/Doctor';
import Sidebar from './components/Sidebar';

const App = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear user's name on logout
    alert("You have been logged out.");
  };

  // List of routes where the sidebar should not be displayed
  const noSidebarRoutes = ['/', '/login', '/register'];

  return (
    <div style={{ display: 'flex' }}>
      {/* Conditionally render Sidebar */}
      {!noSidebarRoutes.includes(location.pathname) && (
        <Sidebar handleLogout={handleLogout} />
      )}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/online-form" element={<OnlineForm />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/patient-profile" element={<PatientProfileForm />} />
          <Route path="/credit-card" element={<CreditCard />} />
          <Route path="/appointment-history" element={<AppointmentHistory />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/history-form" element={<AppointmentHistoryForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
