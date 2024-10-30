import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
// import Calendar from './components/Calendar';
// import OnlineForm from './components/OnlineForm';
// import Patient from './components/Patient';
import PatientProfileForm from './components/PatientProfileForm';
// import CreditCard from './components/CreditCard';

const App = () => {
  return (
    <Router>
      {/* <Home /> */}
      {/* <PaymentMethods /> */}
      {/* <Calendar /> */}
      {/*<OnlineForm /> */}
      {/*<Patient /> */}
      <PatientProfileForm />
      {/*<CreditCard />  */}
    </Router>
  );
};

export default App;
