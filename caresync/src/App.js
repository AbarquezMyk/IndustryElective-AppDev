import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components for Users
import Home from './components/Home';
import PaymentMethods from './components/PaymentMethod';
import Calendar from './components/CalendarComponent';
import OnlineForm from './components/OnlineForm';
import Patient from './components/Patient';
import PatientProfileForm from './components/PatientProfileForm';
import CreditCard from './components/CreditCard';
import Login from './components/Login';
import Register from './components/Register';
import AppointmentHistory from './components/AppointmentHistory';
import AppointmentHistoryForm from './components/AppointmentHistoryForm';
import Doctor from './components/DoctorList';
import Sidebar from './components/Sidebar';
import AddPayment from './components/AddPayment';
import PaymentHistory from './components/PaymentHistory';
import Dashboard from './components/dashboard';
import MedicalHistoryForm from './components/MedicalHistoryForm'; // Import MedicalHistoryForm

// Components for Admins
import AdminHome from './components/AdminHome';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import ManageUsers from './components/ManageUsers';
import AdminLayout from './components/AdminLayout';
import ManageDepartment from './components/ManageDepartment';
import Admin from './components/Admin';
import ManageDoctors from './components/ManageDoctors';
import DepartmentList from './components/DepartmentList';
import DoctorDetails from './components/DoctorDetails';

const GOOGLE_CLIENT_ID = '950088130276-qalr5m3p1bk65ujjb33jsd0c05t3a8r8.apps.googleusercontent.com';

const App = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('jwt');

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    alert('You have been logged out.');
  };

  const noSidebarRoutes = ['/', '/home', '/login', '/register', '/medical-history']; // Exclude '/medical-history' from sidebar

  const shouldHideSidebar =
    noSidebarRoutes.includes(location.pathname) || location.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex' }}>
      {/* Conditionally render Sidebar */}
      {!shouldHideSidebar && <Sidebar handleLogout={handleLogout} />}
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/adminIndex" element={<Admin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-departments" element={<ManageDepartment />} />
            <Route path="manage-doctors" element={<ManageDoctors />} />
          </Route>

          {/* User Routes */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/payment-methods" element={isAuthenticated ? <PaymentMethods /> : <Navigate to="/login" />} />
          <Route path="/calendar" element={isAuthenticated ? <Calendar /> : <Navigate to="/login" />} />
          <Route path="/online-form" element={isAuthenticated ? <OnlineForm /> : <Navigate to="/login" />} />
          <Route path="/patient" element={isAuthenticated ? <Patient /> : <Navigate to="/login" />} />
          <Route path="/patient-profile" element={isAuthenticated ? <PatientProfileForm /> : <Navigate to="/login" />} />
          <Route path="/add-payment" element={isAuthenticated ? <AddPayment /> : <Navigate to="/login" />} />
          <Route path="/payment-history" element={isAuthenticated ? <PaymentHistory /> : <Navigate to="/login" />} />

          {/* Protected Route for Credit Card with userId */}
          <Route path="/credit-card" element={isAuthenticated ? <CreditCard userId={localStorage.getItem('userId')} /> : <Navigate to="/login" />} />

          <Route path="/appointment-history" element={isAuthenticated ? <AppointmentHistory /> : <Navigate to="/login" />} />
          <Route path="/history-form" element={isAuthenticated ? <AppointmentHistoryForm /> : <Navigate to="/login" />} />
          <Route path="/doctors/:departmentId" element={isAuthenticated ? <Doctor /> : <Navigate to="/login" />} />
          <Route path="/department-list" element={isAuthenticated ? <DepartmentList /> : <Navigate to="/login" />} />
          <Route path="/doctor/:doctorId/details" element={isAuthenticated ? <DoctorDetails /> : <Navigate to="/login" />} />

          {/* New Route for Medical History Form */}
          <Route path="/medical-history" element={isAuthenticated ? <MedicalHistoryForm /> : <Navigate to="/login" />} />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);

export default AppWrapper;
