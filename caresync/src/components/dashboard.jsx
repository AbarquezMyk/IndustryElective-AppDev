import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [first_name, setFirst_name] = useState('');
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(0);
  const [latestAppointments, setLatestAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setFirst_name(response.data.first_name);
      })
      .catch(error => console.error("Error fetching user profile:", error));

    axios.get('/api/upcoming-appointments-count')
      .then(response => {
        setUpcomingAppointmentsCount(response.data.count);
      })
      .catch(error => console.error("Error fetching upcoming appointments:", error));

    axios.get('/api/latest-appointments') 
      .then(response => {
        setLatestAppointments(response.data);
      })
      .catch(error => console.error("Error fetching latest appointments:", error));
  }, []);

  return (
    <div style={styles.container}>
      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <p style={styles.profileName}>Hello, {first_name}</p>
            <p style={styles.profileName}>You have {upcomingAppointmentsCount} upcoming appointments</p>
          </div>
        </div>

        {/* Your Doctor Section - Grid Layout */}
        <div style={styles.doctorSection}>
          <p style={styles.sectionTitle}>Your Doctor</p>
          <div style={styles.doctorGrid}>
            <Link to="/doctor" style={styles.doctorCard}>
              <p style={styles.doctorName}>Neurology</p>
            </Link>
            <Link to="/doctor" style={styles.doctorCard}>
              <p style={styles.doctorName}>Cardiac Care</p>
            </Link>
            <Link to="/doctor" style={styles.doctorCard}>
              <p style={styles.doctorName}>Osteoporosis</p>
            </Link>
            <Link to="/doctor" style={styles.doctorCard}>
              <p style={styles.doctorName}>Eye Care</p>
            </Link>
            <Link to="/doctor" style={styles.doctorCard}>
              <p style={styles.doctorName}>Heart Care</p>
            </Link>
            <Link to="/doctor" style={styles.doctorCard}>
              <p style={styles.doctorName}>ENT</p>
            </Link>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div style={styles.appointmentSection}>
          <p style={styles.sectionTitle}>Latest Appointments</p>
          <div style={styles.appointmentContainer}>
            {latestAppointments.length > 0 ? (
              latestAppointments.map((appointment, index) => (
                <div key={index} style={styles.appointmentCard}>
                  <p style={styles.appointmentDate}>{appointment.date}</p>
                  <p style={styles.appointmentDoctor}>Doctor: {appointment.doctorName}</p>
                  <p style={styles.appointmentStatus}>Status: {appointment.status}</p>
                </div>
              ))
            ) : (
              <p>No past appointments available</p>
            )}
          </div>
        </div>
      </div>
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
    color: '#023350',
  },
  profileName: {
    fontSize: '16px',
    color: '#4F4F4F',
  },
  doctorSection: {
    marginTop: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#023350',
    marginBottom: '10px',
  },
  doctorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  doctorCard: {
    padding: '20px',
    border: '1px solid #023350',
    borderRadius: '8px',
    textDecoration: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  doctorName: {
    fontSize: '18px',
    color: '#023350',
  },
  appointmentSection: {
    marginTop: '30px',
  },
  appointmentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  appointmentCard: {
    padding: '15px',
    border: '1px solid #023350',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  appointmentDate: {
    fontSize: '16px',
    color: '#023350',
  },
  appointmentDoctor: {
    fontSize: '16px',
    color: '#023350',
  },
  appointmentStatus: {
    fontSize: '14px',
    color: '#4F4F4F',
  },
};

export default Dashboard;