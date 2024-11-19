import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentHistoryForm from './AppointmentHistoryForm';
import logo from './img/logo.png';

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

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
    alert("You have been logged out.");
  };

  const today = new Date();
  const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.historyDate) >= today);
  const pastAppointments = appointments.filter((appointment) => new Date(appointment.historyDate) < today);

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <ul style={styles.navList}>
          <li style={styles.dashboardNavItem}>Dashboard</li>
          <li style={styles.appointmentsNavItem}>Appointments</li>
          <li style={styles.calendarNavItem}>Calendar</li>
          <li style={styles.paymentsNavItem}>Payments</li>
          <li style={styles.settingsNavItem}>Settings</li>
        </ul>
        <div style={styles.logout} onClick={handleLogout}>Log Out</div>
      </aside>
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>My Appointments</h2>
          <div style={styles.profile}>
            <p style={styles.profileName}>name here</p>
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
    color: '#023350',
  },
  profileName: {
    fontSize: '16px',
    color: '#4F4F4F',
  },
  appointmentSection: {
    marginTop: '30px'
  },
  appointmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  appointmentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #e6e6e6',
    alignItems: 'center'
  },
  appointmentInfo: {
    flex: 1
  },
  appointmentActions: {
    display: 'flex',
    gap: '10px'
  },
  cancelButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#FFCCCC',
    color: '#FF0000',
    border: 'none',
    cursor: 'pointer'
  },
  detailButton: {
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#023350',
    color: '#FFFFFF',
    border: 'none',
    cursor: 'pointer'
  }
};

export default AppointmentHistory;