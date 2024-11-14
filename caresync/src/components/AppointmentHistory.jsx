import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import AppointmentHistoryForm from './AppointmentHistoryForm';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const userName = localStorage.getItem("userName"); // Retrieve the user's name

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/appointment-history/search');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [refreshFlag]);

  const triggerRefresh = () => {
    setRefreshFlag(!refreshFlag);
  };

  const handleCancel = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/appointment-history/${id}`);
      triggerRefresh();
      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleDetail = (appointment) => {
    alert(`Details:\nDate: ${appointment.historyDate}\nReasons: ${appointment.reasons}\nStatus: ${appointment.status}\nResults: ${appointment.results}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear user's name on logout
    alert("You have been logged out.");
  };

  const today = new Date();
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.historyDate) >= today);
  const pastAppointments = appointments.filter((appointment) => new Date(appointment.historyDate) < today);

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <img src={logo} alt="CareSync Logo" style={styles.logo} />
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.dashboardNavItem}>
              <img src={dashboard} alt="Dashboard" style={styles.navIcon} />
              Dashboard
            </li>
            <li style={styles.appointmentsNavItem}>
              <img src={appointment} alt="Appointments" style={styles.navIcon} />
              <Link to="/appointment-history" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Appointments</Link>
            </li>
            <li style={styles.calendarNavItem}>
              <img src={calendar} alt="Calendar" style={styles.navIcon} />
              <Link to="/calendar" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Calendar</Link>
            </li>
            <li style={styles.paymentsNavItem}>
              <img src={payment} alt="Payments" style={styles.navIcon} />
              <Link to="/payment-methods" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Payments</Link>
            </li>
            <li style={styles.settingsNavItem}>
              <img src={setting} alt="Settings" style={styles.navIcon} />
              <Link to="/settings" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Settings</Link>
            </li>
          </ul>
        </nav>
        <div style={styles.logout}>
          <img src={logout} alt="Log Out" style={styles.navIcon} />
          <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Log Out</Link>
        </div>
      </div>
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>My Appointments</h2>
          <div style={styles.profile}>
            <p style={styles.profileName}>{userName}</p> {/* Display the user's name */}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <section style={styles.appointmentSection}>
          <h3>Upcoming</h3>
          <div style={styles.appointmentList}>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} style={styles.appointmentCard}>
                  <div style={styles.appointmentInfo}>
                    <p><strong>{appointment.historyDate}</strong></p>
                    <p>Reasons: {appointment.reasons}</p>
                    <p>Status: {appointment.status}</p>
                    <p>Results: {appointment.results}</p>
                  </div>
                  <div style={styles.appointmentActions}>
                    <button style={styles.cancelButton} onClick={() => handleCancel(appointment.id)}>Cancel</button>
                    <button style={styles.detailButton} onClick={() => handleDetail(appointment)}>Detail</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming appointments.</p>
            )}
          </div>
        </section>

        {/* Past Appointments */}
        <section style={styles.appointmentSection}>
          <h3>Past</h3>
          <div style={styles.appointmentList}>
            {pastAppointments.length > 0 ? (
              pastAppointments.map((appointment) => (
                <div key={appointment.id} style={styles.appointmentCard}>
                  <div style={styles.appointmentInfo}>
                    <p><strong>{appointment.historyDate}</strong></p>
                    <p>Reasons: {appointment.reasons}</p>
                    <p>Status: {appointment.status}</p>
                    <p>Results: {appointment.results}</p>
                  </div>
                  <div style={styles.appointmentActions}>
                    <button style={styles.detailButton} onClick={() => handleDetail(appointment)}>Detail</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No past appointments.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial',
    height: '100vh'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    borderRight: '1px solid #e6e6e6'
  },
  logo: {
    width: '150px',
    marginBottom: '20px'
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
    border: '1.5px solid #023350',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px'
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
    marginBottom: '10px'
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
    fontWeight: 'bold'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#F8F9FA',
    overflowY: 'auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333'
  },
  profile: {
    backgroundColor: '#023350',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '20px',
  },
  profileName: {
    margin: 0,
  },
  appointmentSection: {
    marginBottom: '30px'
  },
  appointmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between'
  },
  appointmentInfo: {
    fontSize: '16px',
    color: '#333'
  },
  appointmentActions: {
    display: 'flex',
    gap: '10px'
  },
  cancelButton: {
    padding: '8px 15px',
    backgroundColor: 'red',
    color: '#FFFFFF',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  },
  detailButton: {
    padding: '8px 15px',
    backgroundColor: '#023350',
    color: '#FFFFFF',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AppointmentHistory;