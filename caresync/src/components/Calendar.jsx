import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './path_to_logo_image';
import dashboard from './path_to_dashboard_icon';
import appointment from './path_to_appointment_icon';
import calendar from './path_to_calendar_icon';
import payment from './path_to_payment_icon';
import setting from './path_to_setting_icon';
import logout from './path_to_logout_icon';

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
      <img src={logo} alt="CareSync Logo" style={{ width: '100px', height: 'auto', marginBottom: '20px' }} />
    </div>
    <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
      <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
        <img src={dashboard} alt="Dashboard Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        <Link to="/" style={{ textDecoration: 'none', color: '#023350', fontSize: '16px' }}>Dashboard</Link>
      </li>
      <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
        <img src={appointment} alt="Appointments Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        <Link to="/appointment" style={{ textDecoration: 'none', color: '#023350', fontSize: '16px' }}>Appointments</Link>
      </li>
      <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center', backgroundColor: '#F1F3F5', borderRadius: '5px', padding: '5px 10px' }}>
        <img src={calendar} alt="Calendar Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        <Link to="/calendar" style={{ textDecoration: 'none', color: '#023350', fontSize: '16px' }}>Calendar</Link>
      </li>
      <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
        <img src={payment} alt="Payments Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        <Link to="/payments" style={{ textDecoration: 'none', color: '#023350', fontSize: '16px' }}>Payments</Link>
      </li>
      <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
        <img src={setting} alt="Settings Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        <Link to="/settings" style={{ textDecoration: 'none', color: '#023350', fontSize: '16px' }}>Settings</Link>
      </li>
    </ul>
    <div style={{ textAlign: 'center', marginTop: 'auto' }}>
      <button
        onClick={() => console.log("Logout")}
        style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <img src={logout} alt="Logout Icon" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
        Log Out
      </button>
    </div>
  </div>
);

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
    <div style={{ flex: '1', padding: '20px', backgroundColor: '#F8F9FA' }}>
      <h1 style={{ fontSize: '24px', color: '#023350', textAlign: 'center', marginBottom: '20px' }}>CALENDAR</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={handlePreviousMonth} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
          &#9664;
        </button>
        <h2 style={{ fontSize: '20px', color: '#023350' }}>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
          &#9654;
        </button>
      </div>
      
      <div style={{
        border: '1px solid #CED4DA',
        borderRadius: '5px',
        padding: '10px',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <th key={day} style={{ padding: '10px', borderBottom: '1px solid #CED4DA', color: '#023350' }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}></td>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}>15</td>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}>
                <div style={{ backgroundColor: '#023350', color: 'white', padding: '5px', borderRadius: '5px' }}>
                  Appointment with Dr. Carter
                </div>
              </td>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}>17</td>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}>18</td>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}>19</td>
              <td style={{ padding: '10px', textAlign: 'center', color: '#023350' }}>20</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <Calendar />
  </div>
);

export default App;
