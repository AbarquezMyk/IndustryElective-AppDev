import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios directly

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [upcomingAppointmentsCount, setUpcomingAppointmentsCount] = useState(0);
  const [latestAppointments, setLatestAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');  // Retrieve userId from localStorage
    
      if (!userId) {
        console.error('User is not authenticated.');
        return;  // Exit if no userId is found
      }
  
      try {
        // Fetch user details
        const userResponse = await axios.get('http://localhost:8080/api/users/me', {
          headers: { 
            'userId': userId  // Pass the userId instead of JWT
          },
        });
  
        console.log(userResponse); // Log the response to check its structure
        
        if (userResponse.data && userResponse.data.username) {
          setUsername(userResponse.data.username); // Set the username from API
        } else {
          console.error('Username not found in the response.');
        }
    
        // Fetch upcoming appointments count
        const countResponse = await axios.get('http://localhost:8080/api/upcoming-appointments-count', {
          headers: { 
            'userId': userId  // Pass the userId here too
          },
        });
        setUpcomingAppointmentsCount(countResponse.data.count);
    
        // Fetch latest appointments
        const appointmentsResponse = await axios.get('http://localhost:8080/api/latest-appointments', {
          headers: { 
            'userId': userId  // Pass the userId here too
          },
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
            <p style={styles.profileName}>Hello, {username}</p>
            <p style={styles.profileName}>You have {upcomingAppointmentsCount} upcoming appointments</p>
          </div>

          {/* User Name Button */}
          <button style={styles.userButton}>{username}</button>
        </div>

        {/* Relocated Message */}
        <div style={styles.relocatedMessage}>
          <p>
            Feeling unwell?{' '}
            <Link to="/department-list" style={styles.link}>
              Book your appointment now!
            </Link>
          </p>
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
