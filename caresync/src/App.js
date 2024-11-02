import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
// import Calendar from './components/Calendar';
// import OnlineForm from './components/OnlineForm';
// import Patient from './components/Patient';
// import PatientProfileForm from './components/PatientProfileForm';
// import CreditCard from './components/CreditCard';
// import Login from './components/Login';
// import Register from './components/Register';
// import AppointmentHistory from './components/AppointmentHistory';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/paymentmethod" element={<PaymentMethods />} /> */}
        {/* <Route path="/" element={<CreditCard />} /> */}
        {/* <Route path="/Calendar" element={<Calendar />} /> */}
        {/* <OnlineForm /> */}
        {/* <Patient /> */}
        {/* <Route path="/profilesetup" element={<PatientProfileForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
