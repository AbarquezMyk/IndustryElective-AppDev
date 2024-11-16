import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import visa from './img/visa-icon.png';
import paypal from './img/paypal-color-icon.png';
import gcash from './img/gcash-icon.png';
import applepay from './img/apple-pay-icon.png';
import logout from './img/logout_icon.png';
import calendar from './img/calendar_icon.png';

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

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial',
    height: 'auto'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    borderRight: '1px solid #e6e6e6'
  },
  logo: {
    width: '200px',
    marginBottom: '-30px',
    marginTop: '-50px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    width: '100%'
  },
  dashboardNavItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#023350',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: '10px'
  },
  appointmentsNavItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#023350',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  calendarNavItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#4F4F4F',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
  },
  paymentsNavItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#4F4F4F',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px',
    border: '1.5px solid #023350',
  },
  settingsNavItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#4F4F4F',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  navIcon: {
    width: '20px',
    height: '20px',
    marginRight: '30px'
  },
  logout: {
    marginTop: 'auto',
    marginBottom: '50px',
    color: 'red',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#F8F9FA',
    height: '870px',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  headerTitle: {
    fontSize: '24px',
    color: '#023350',
    marginTop: '40px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  profileName: {
    fontSize: '16px',
    color: '#4F4F4F',
    marginTop: '40px',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '400px'
  },
  filter: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px'
  },
  dateInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px'
  },
  appointmentSection: {
    marginTop: '45px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#023350',
    marginBottom: '20px'
  },
  appointmentCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    height: '90px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    border: '1px solid #e6e6e6',
    marginBottom: '10px'
  },
  doctorImage: {
    width: '65px',
    height: '70px',
    borderRadius: '50%',
    marginRight: '15px',
  },
  appointmentDetails: {
    flex: 1
  },
  doctorName: {
    fontSize: '16px',
    color: '#023350',
    marginBottom: '5px'
  },
  appointmentTime: {
    fontSize: '14px',
    color: '#4F4F4F'
  },
  appointmentActions: {
    display: 'flex',
    gap: '10px'
  },
  cancelButton: {
    padding: '5px 15px',
    border: '1px solid red',
    borderRadius: '5px',
    color: 'red',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  },
  detailButton: {
    padding: '5px 15px',
    border: '1px solid #023350',
    borderRadius: '5px',
    color: '#023350',
    backgroundColor: 'transparent',
    cursor: 'pointer'
  }
};

export default PaymentMethods;
