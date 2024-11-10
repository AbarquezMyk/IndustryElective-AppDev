import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Doctor from './components/Doctor';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route to Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Other application routes */}
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/online-form" element={<OnlineForm />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/patient-profile" element={<PatientProfileForm />} />
        <Route path="/credit-card" element={<CreditCard />} />
        <Route path="/appointment-history" element={<AppointmentHistory />} />
        <Route path="/doctor" element={<Doctor />} />

        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
