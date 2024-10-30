import React from 'react';
import logo from '../assets/logo.png'; // Make sure the logo image is in the assets folder

const AppointmentHistory = () => {
  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <img src={logo} alt="CareSync Logo" style={styles.logo} />
        <h2 style={styles.appName}>CareSync</h2>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>Dashboard</li>
            <li style={styles.activeNavItem}>Appointments</li>
            <li style={styles.navItem}>Calendar</li>
            <li style={styles.navItem}>Payments</li>
            <li style={styles.navItem}>Settings</li>
          </ul>
        </nav>
        <div style={styles.logout}>Log Out</div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <header style={styles.header}>
          <h1 style={styles.headerTitle}>My appointments</h1>
          <div style={styles.profile}>
            <span style={styles.profileName}>name here</span>
          </div>
        </header>
        <div style={styles.filters}>
          <input type="text" placeholder="Search" style={styles.searchInput} />
          <select style={styles.filter}>
            <option>All</option>
          </select>
          <select style={styles.filter}>
            <option>Visit Type</option>
          </select>
          <select style={styles.filter}>
            <option>Visit Status</option>
          </select>
          <input type="date" style={styles.dateInput} />
        </div>

        {/* Appointments */}
        <div style={styles.appointmentSection}>
          <h2 style={styles.sectionTitle}>Upcoming</h2>
          <div style={styles.appointmentCard}>
            <img src="https://via.placeholder.com/50" alt="Doctor" style={styles.doctorImage} />
            <div style={styles.appointmentDetails}>
              <p style={styles.doctorName}>Dr. Emily Carter</p>
              <p style={styles.appointmentTime}>25.10.2024 - 10:00</p>
            </div>
            <div style={styles.appointmentActions}>
              <button style={styles.cancelButton}>Cancel</button>
              <button style={styles.detailButton}>Detail</button>
            </div>
          </div>
          <h2 style={styles.sectionTitle}>Past</h2>
          <div style={styles.appointmentCard}>
            <img src="https://via.placeholder.com/50" alt="Doctor" style={styles.doctorImage} />
            <div style={styles.appointmentDetails}>
              <p style={styles.doctorName}>Dr. Alex Rivera</p>
              <p style={styles.appointmentTime}>11.08.2024 - 15:20</p>
            </div>
            <button style={styles.detailButton}>Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    fontFamily: 'Arial, sans-serif'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    borderRight: '1px solid #e6e6e6'
  },
  logo: {
    width: '80px',
    marginBottom: '10px'
  },
  appName: {
    fontSize: '24px',
    color: '#023350',
    letterSpacing: '2px'
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    width: '100%'
  },
  navItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#023350',
    cursor: 'pointer'
  },
  activeNavItem: {
    padding: '15px 20px',
    fontSize: '16px',
    color: '#023350',
    backgroundColor: '#f0f4f8',
    borderLeft: '4px solid #023350'
  },
  logout: {
    marginTop: 'auto',
    marginBottom: '20px',
    color: 'red',
    cursor: 'pointer'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#F8F9FA',
    height: '100vh',
    overflowY: 'scroll'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  headerTitle: {
    fontSize: '24px',
    color: '#023350'
  },
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  profileName: {
    fontSize: '16px',
    color: '#4F4F4F'
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  filter: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  dateInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  appointmentSection: {
    marginTop: '20px'
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#023350',
    marginBottom: '10px'
  },
  appointmentCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    border: '1px solid #e6e6e6',
    marginBottom: '10px'
  },
  doctorImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px'
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

export default AppointmentHistory;