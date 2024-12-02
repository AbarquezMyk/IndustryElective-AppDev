import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(0);
  const [latestAppointments, setLatestAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User is not authenticated.');
        return;
      }

      try {
        const userResponse = await axios.get('http://localhost:8080/api/users/me', {
          headers: { 'userId': userId },
        });
        setUsername(userResponse.data.username || 'Guest');

        const countResponse = await axios.get(
          'http://localhost:8080/api/upcoming-appointments-count',
          { headers: { 'userId': userId } }
        );
        setUpcomingAppointmentsCount(countResponse.data.count);

        const appointmentsResponse = await axios.get(
          'http://localhost:8080/api/latest-appointments',
          { headers: { 'userId': userId } }
        );
        setLatestAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.mainContent}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.welcomeMessage}>Hi, {username}</h1>
        <button style={styles.userButton}>{username}</button>
      </div>

      {/* Feeling Unwell Section */}
      <div style={styles.bookingCard}>
        <h2 style={styles.bookingTitle}>Feeling Unwell?</h2>
        <p style={styles.bookingDescription}>
          Don't wait! Book an appointment with a specialist now and take the first step toward recovery.
        </p>
        <Link to="/department-list" style={styles.bookingButton}>
          Book Appointment
        </Link>
      </div>

      {/* Latest Appointments Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Upcoming Appointments</h2>
        {latestAppointments.length ? (
          latestAppointments.map((appointment) => (
            <div key={appointment.id} style={styles.appointmentCard}>
              <p style={styles.appointmentDate}>
                {new Date(appointment.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p style={styles.infoText}>No upcoming appointments.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: '20px',
    backgroundColor: '#fff',
    height: '100%',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  welcomeMessage: {
    fontSize: '24px',
    color: '#333',
    margin: 0,
  },
  userButton: {
    padding: '8px 16px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  bookingCard: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  bookingTitle: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
  },
  bookingDescription: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '15px',
  },
  bookingButton: {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  section: {
    marginTop: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
  },
  appointmentCard: {
    padding: '10px',
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
  },
  infoText: {
    fontSize: '16px',
    color: '#555',
  },
};

export default Dashboard;
