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
import Settings from './components/Settings';

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

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = '950088130276-qalr5m3p1bk65ujjb33jsd0c05t3a8r8.apps.googleusercontent.com';

// PrivateRoute component for protected routes
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('jwt');

  // Handle Logout and redirect
  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    alert('You have been logged out.');
    window.location.href = '/login'; // Redirect to login
  };

  // Exclude routes from sidebar
  const noSidebarRoutes = ['/', '/home', '/login', '/register', '/medical-history'];

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
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/payment-methods" element={<PrivateRoute element={<PaymentMethods />} />} />
          <Route path="/calendar" element={<PrivateRoute element={<Calendar />} />} />
          <Route path="/online-form" element={<PrivateRoute element={<OnlineForm />} />} />
          <Route path="/patient" element={<PrivateRoute element={<Patient />} />} />
          <Route path="/patient-profile" element={<PrivateRoute element={<PatientProfileForm />} />} />
          <Route path="/add-payment" element={<PrivateRoute element={<AddPayment />} />} />
          <Route path="/payment-history" element={<PrivateRoute element={<PaymentHistory />} />} />

          {/* Protected Route for Credit Card with userId */}
          <Route path="/credit-card" element={<PrivateRoute element={<CreditCard userId={localStorage.getItem('userId')} />} />} />

          <Route path="/appointment-history" element={<PrivateRoute element={<AppointmentHistory />} />} />
          <Route path="/history-form" element={<PrivateRoute element={<AppointmentHistoryForm />} />} />
          <Route path="/doctors/:departmentId" element={<PrivateRoute element={<Doctor />} />} />
          <Route path="/department-list" element={<PrivateRoute element={<DepartmentList />} />} />
          <Route path="/doctor/:doctorId/details" element={<PrivateRoute element={<DoctorDetails />} />} />

          {/* New Route for Medical History Form */}
          <Route path="/medical-history" element={<PrivateRoute element={<MedicalHistoryForm />} />} />

           {/* New Route for Settings */}
           <Route path="/settings" element={<Settings />} />



          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
};

// Wrap App in Google OAuth and Router
const AppWrapper = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
);

export default AppWrapper;
