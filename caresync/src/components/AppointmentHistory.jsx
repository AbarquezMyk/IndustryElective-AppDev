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
      const response = await axios.get('http://localhost:8082/api/appointments/getAllAppointments');
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
      await axios.delete(`http://localhost:8082/api/appointments/deleteAppointment/${id}`);
      triggerRefresh();
      alert("Appointment canceled successfully.");
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleDetail = (appointment) => {
    // Here you can either open a modal or redirect to a detailed page
    alert(`Appointment details:\nDoctor: ${appointment.doctorName}\nDate: ${new Date(appointment.appointmentDateTime).toLocaleString()}\nReason: ${appointment.reason}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear user's name on logout
    alert("You have been logged out.");
  };

  const today = new Date();
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointmentDateTime) >= today);
  const pastAppointments = appointments.filter(appointment => new Date(appointment.appointmentDateTime) < today);

  return (
    <div style={styles.container}>
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
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} style={styles.appointmentCard}>
                <div style={styles.appointmentInfo}>
                  <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                  <p><strong>Reason:</strong> {appointment.reason}</p>
                  <p><strong>Date & Time:</strong> {new Date(appointment.appointmentDateTime).toLocaleString()}</p>
                </div>
                <div style={styles.appointmentActions}>
                  <button
                    onClick={() => handleDetail(appointment)}
                    style={styles.detailButton}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Appointments */}
        <section style={styles.appointmentSection}>
          <h3>Past</h3>
          <div style={styles.appointmentList}>
            {pastAppointments.map((appointment) => (
              <div key={appointment.id} style={styles.appointmentCard}>
                <div style={styles.appointmentInfo}>
                  <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                  <p><strong>Reason:</strong> {appointment.reason}</p>
                  <p><strong>Date & Time:</strong> {new Date(appointment.appointmentDateTime).toLocaleString()}</p>
                </div>
                <div style={styles.appointmentActions}>
                  <button
                    onClick={() => handleDetail(appointment)}
                    style={styles.detailButton}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
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
