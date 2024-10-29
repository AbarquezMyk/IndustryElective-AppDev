import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

// Sidebar component
const Sidebar = () => (
  <div style={{
    width: '250px',
    backgroundColor: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRight: '1px solid #CED4DA',
    height: '100vh'
  }}>
    <div style={{ textAlign: 'center' }}>
      <img src={logo} alt="CareSync Logo" style={{ width: '60px', height: 'auto', marginBottom: '20px' }} />
      <h3 style={{ fontWeight: '400', color: '#023350', fontSize: '24px', letterSpacing: '2px' }}>CareSync</h3>
    </div>
    <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
      {[
        { icon: dashboard, label: 'Dashboard', link: '/' },
        { icon: appointment, label: 'Appointments', link: '/appointment' },
        { icon: calendar, label: 'Calendar', link: '/calendar', highlighted: true },
        { icon: payment, label: 'Payments', link: '/payments' },
        { icon: setting, label: 'Settings', link: '/settings' },
      ].map((item, index) => (
        <li key={index} style={{ 
          margin: '15px 0', 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: item.highlighted ? '#F1F3F5' : 'transparent',
          borderRadius: item.highlighted ? '8px' : 'none',
          padding: item.highlighted ? '10px' : '0' 
        }}>
          <img src={item.icon} alt={`${item.label} Icon`} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <Link to={item.link} style={{ textDecoration: 'none', color: '#023350', fontSize: '16px' }}>{item.label}</Link>
        </li>
      ))}
    </ul>
    <div style={{ textAlign: 'center', marginTop: 'auto' }}>
      <button
        onClick={() => console.log("Logout")}
        style={{ color: '#E74C3C', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <img src={logout} alt="Logout Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
        Log Out
      </button>
    </div>
  </div>
);

// Calendar component
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: '1', padding: '40px', backgroundColor: '#F8F9FA' }}>
        <h1 style={{ fontSize: '32px', color: '#023350', textAlign: 'center', marginBottom: '20px', letterSpacing: '5px' }}>CALENDAR</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={handlePreviousMonth} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
            &#9664;
          </button>
          <h2 style={{ fontSize: '20px', color: '#023350', margin: '0 20px' }}>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={handleNextMonth} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
            &#9654;
          </button>
        </div>
        
        <div style={{
          border: '1px solid #CED4DA',
          borderRadius: '8px',
          padding: '20px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <th key={day} style={{ padding: '15px', borderBottom: '1px solid #CED4DA', color: '#6C757D', fontSize: '16px' }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}></td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}>15</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}>
                  <div style={{ backgroundColor: '#023350', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '14px' }}>
                    Appointment with Dr. Carter
                  </div>
                </td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}>17</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}>18</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}>19</td>
                <td style={{ padding: '15px', textAlign: 'center', color: '#023350' }}>20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
