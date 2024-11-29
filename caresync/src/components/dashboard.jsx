import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios directly

const Dashboard = () => {
  const [username, setUsername] = useState('');  // Change to username instead of fullName
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(0);
  const [latestAppointments, setLatestAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('jwt'); // Retrieve token from local storage
    
      try {
        // Fetch user details
        const userResponse = await axios.get('http://localhost:8080/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the header
        });
    
        console.log(userResponse); // Log the response to check its structure
        
        // Check if the response contains 'username' and set it correctly
        if (userResponse.data && userResponse.data.username) {
          setUsername(userResponse.data.username); // Set the username from API
        } else {
          console.error('Username not found in the response.');
        }
    
        // Fetch upcoming appointments count
        const countResponse = await axios.get('http://localhost:8080/api/upcoming-appointments-count', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the header
        });
        setUpcomingAppointmentsCount(countResponse.data.count);
    
        // Fetch latest appointments
        const appointmentsResponse = await axios.get('http://localhost:8080/api/latest-appointments', {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the header
        });
        setLatestAppointments(appointmentsResponse.data);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <p style={styles.profileName}>Hello, {username}</p>  {/* Updated to username */}
            <p style={styles.profileName}>You have {upcomingAppointmentsCount} upcoming appointments</p>
          </div>

          {/* User Name Button */}
          <button style={styles.userButton}>{username}</button>  {/* Updated to username */}
        </div>

        {/* Relocated Message */}
        <div style={styles.relocatedMessage}>
          <p>
            Feeling unwell?{' '}
            <Link to="/history-form" style={styles.link}>
              Book your appointment now!
            </Link>
          </p>
        </div>

        {/* Your Doctor Section */}
        <div style={styles.doctorSection}>
          <p style={styles.sectionTitle}>Your Doctor</p>
          <div style={styles.doctorGrid}>
            {['Neurology', 'Cardiac Care', 'Osteoporosis', 'Eye Care', 'Heart Care', 'ENT'].map((specialty) => (
              <Link to="/department-list" style={styles.doctorCard} key={specialty}>
                <p style={styles.doctorName}>{specialty}</p>
              </Link>
            ))}
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
    height: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#F8F9FA',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  headerTitle: {
    fontSize: '24px',
    color: '#023350',
  },
  profileName: {
    fontSize: '16px',
    color: '#4F4F4F',
  },
  userButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  relocatedMessage: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#F1F1F1',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
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
