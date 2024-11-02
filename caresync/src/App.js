import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
import Calendar from './components/Calendar';
// import OnlineForm from './components/OnlineForm';
// import Patient from './components/Patient';
import PatientProfileForm from './components/PatientProfileForm';
// import CreditCard from './components/CreditCard';
import Login from './components/Login';
import Register from './components/Register';
// import AppointmentHistory from './components/AppointmentHistory';

const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        {/* <PaymentMethods /> */}
        {/* <Calendar /> */}
        {/* <OnlineForm /> */}
        {/* <Patient /> */}
        <Route path="/profilesetup" element={<PatientProfileForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
=======
      <Route path="/home" element={<Home />} />
      {/* <PaymentMethods /> */} 
      <Route path="/Calendar" element={<Calendar />} />
      {/*<OnlineForm /> */}
      {/*<Patient /> */}
      {/*<PatientProfileForm /> */}
      {/*<CreditCard /> */}
      {/*<CreditCard />  */}
      {/*<AppointmentHistory /> */}
      <Route path="/profilesetup" element={<PatientProfileForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
>>>>>>> f7e8284fb007bcfd7ae17af82d1c7b1c122bfc3f
      </Routes>
    </Router>
  );
};

export default App;
