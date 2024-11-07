import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
// import Calendar from './components/Calendar';
// import OnlineForm from './components/OnlineForm';
// import Patient from './components/Patient';
// import PatientProfileForm from './components/PatientProfileForm';
// import CreditCard from './components/CreditCard';
// import Login from './components/Login';
// import Register from './components/Register';
// import AppointmentHistory from './components/AppointmentHistory';
import Doctor from './components/Doctor';

const App = () => {
  return (
    <Router>
      <Routes>
      {/*<Route path="/" element={<Navigate to="/calendar" replace />} /> */}
      {/* <Route path="/calendar" element={<Calendar />} /> */}
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/" element={<Doctor />} />

      {/* <PaymentMethods /> */}
      {/* <Calendar /> */}
      </Routes>
    </Router>
  );
};

export default App;
