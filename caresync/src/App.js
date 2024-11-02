import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
import Calendar from './components/Calendar';
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
      <Route path="/" element={<Navigate to="/calendar" replace />} />
      <Route path="/calendar" element={<Calendar />} />
       {/* <Route path="/home" element={<Home />} /> */}

      {/* <PaymentMethods /> */}
      {/*<OnlineForm /> */}
      {/*<Patient /> */}
      {/*<PatientProfileForm /> */}
      {/*<CreditCard /> */}
      {/*<CreditCard />  */}
      {/*<AppointmentHistory /> */}
      {/* <Route path="/profilesetup" element={<PatientProfileForm />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
