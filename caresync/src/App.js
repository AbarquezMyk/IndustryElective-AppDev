import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home'; 
import PaymentMethods from './components/PaymentMethod';

const App = () => {
  return (
    <Router>
      {/* <Home />  */}
      <PaymentMethods />
    </Router>
  );
};

export default App;
