import React from 'react';
<<<<<<< HEAD
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
//import AppointmentHistory from './components/AppointmentHistory';
=======
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
>>>>>>> 3d7323afcbefb0e6a95c77ec1018b701d3df8184

const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
   <Route path="/" element={<Navigate to="/calendar" replace />} /> 
    <Route path="/calendar" element={<Calendar />} />
    {/* <Route path="/home" element={<Home />} /> */}
    {/* <PaymentMethods /> */}
      {/*<OnlineForm /> */}
      {/*<Patient /> */}
      {/*<PatientProfileForm /> */}
      {/*<CreditCard /> */}
      {/*<CreditCard />  */}
      {/*<Route path="/history" element={<AppointmentHistory />} />
      {/* <Route path="/profilesetup" element={<PatientProfileForm />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
=======
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
>>>>>>> 3d7323afcbefb0e6a95c77ec1018b701d3df8184
      </Routes>
    </Router>
  );
};

export default App;
