import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import visa from './img/visa-icon.png';
import paypal from './img/paypal-color-icon.png';
import gcash from './img/gcash-icon.png';
import applepay from './img/apple-pay-icon.png';

const PaymentMethods = () => {

  useEffect(() => {
    fetch('/api/payments')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // The empty array means this effect runs only once, after the initial render.

  return (
    <div>
      {/* Main Content */}
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center', color: '#023350', fontFamily: "'Manjari'" }}>Payment Methods</h2>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#023350' }}>How do you want to pay?</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Credit Card Button */}
          <Link to="/credit-card" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#f0f0f0', border: '1px solid #CED4DA', borderRadius: '8px',
              padding: '10px 20px', cursor: 'pointer'
            }}>
              <span style={{ fontFamily: "'Manjari'", color: '#023350' }}>Credit Card</span>
              <img src={visa} alt="Credit Card" style={{ width: '40px' }} />
            </div>
          </Link>

          {/* PayPal Button */}
          <Link to="/paypal" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#f0f0f0', border: '1px solid #CED4DA', borderRadius: '8px',
              padding: '10px 20px', cursor: 'pointer'
            }}>
              <span style={{ fontFamily: "'Manjari'", color: '#023350' }}>PayPal</span>
              <img src={paypal} alt="PayPal" style={{ width: '40px' }} />
            </div>
          </Link>

          {/* GCash Button */}
          <Link to="/gcash" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#f0f0f0', border: '1px solid #CED4DA', borderRadius: '8px',
              padding: '10px 20px', cursor: 'pointer'
            }}>
              <span style={{ fontFamily: "'Manjari'", color: '#023350' }}>GCash</span>
              <img src={gcash} alt="GCash" style={{ width: '40px' }} />
            </div>
          </Link>

          {/* Apple Pay Button */}
          <Link to="/apple_pay" style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#f0f0f0', border: '1px solid #CED4DA', borderRadius: '8px',
              padding: '10px 20px', cursor: 'pointer'
            }}>
              <span style={{ fontFamily: "'Manjari'", color: '#023350' }}>Apple Pay</span>
              <img src={applepay} alt="Apple Pay" style={{ width: '40px' }} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default PaymentMethods;
