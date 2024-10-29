import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
// import Calendar from './components/Calendar';
import OnlineForm from './components/OnlineForm';

const App = () => {
  return (
    <Router>
      {/* <Home /> */}
      {/* <PaymentMethods /> */}
      <OnlineForm />
      {/* <Calendar /> */}
    </Router>
  );
};

export default App;
