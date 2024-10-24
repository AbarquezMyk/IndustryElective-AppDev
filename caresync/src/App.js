import React from 'react';
import './App.css';
import PaymentMethods from './components/PaymentMethod'; 
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'; 

// Create a Layout component that handles the button logic
function Layout() {
  const location = useLocation(); // This is now safe to use here inside Router

  return (
    <div>
      {/* Conditionally show "Go to Payment Methods" button on all pages except /payments */}
      {location.pathname !== '/payments' && (
        <div>
          <Link to="/payments">
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Go to Payment Methods
            </button>
          </Link>
        </div>
      )}

      {/* Conditionally show "Go back to homepage" button only on /payments page */}
      {location.pathname === '/payments' && (
        <div>
          <Link to="/">
            <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Go back to Homepage
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Layout /> {/* Render Layout to handle buttons */}
        <Routes>
          <Route path="/payments" element={<PaymentMethods />} />
          <Route path="/" element={<h1>Welcome to CareSync</h1>} /> {/* Default homepage */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
