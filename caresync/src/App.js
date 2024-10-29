import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
//import Home from './components/Home';
// import PaymentMethods from './components/PaymentMethod';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <Router>
      {/* <Home /> */}
      {/* <PaymentMethods /> */}
      <Calendar />
    </Router>
  );
};

export default App;
