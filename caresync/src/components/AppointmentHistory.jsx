import React from 'react';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';
import doctor1 from './img/Doctor `.png';
import doctor2 from './img/Doctor 2.png';
import doctor3 from './img/Doctor 3.png';
import doctor4 from './img/Doctor 4.png';

const AppointmentHistory = () => {
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
              Appointments
            </li>
            <li style={styles.calendarNavItem}>
              <img src={calendar} alt="Calendar" style={styles.navIcon} />
              Calendar
            </li>
            <li style={styles.paymentsNavItem}>
              <img src={payment} alt="Payments" style={styles.navIcon} />
              Payments
            </li>
            <li style={styles.settingsNavItem}>
              <img src={setting} alt="Settings" style={styles.navIcon} />
              Settings
            </li>
          </ul>
        </nav>
        <div style={styles.logout}>
          <img src={logout} alt="Log Out" style={styles.navIcon} />
          Log Out
        </div>
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
            <img src={doctor1} alt="Doctor 1" style={styles.doctorImage} />
            <div style={styles.appointmentDetails}>
              <p style={styles.doctorName}>Dr. Emily Carter</p>
              <p style={styles.appointmentTime}>25.10.2024 - 10:00</p>
            </div>
            <div style={styles.appointmentActions}>
              <button style={styles.cancelButton}>Cancel</button>
              <button style={styles.detailButton}>Detail</button>
            </div>
          </div>
          {/* Additional Upcoming Appointment */}
          <div style={styles.appointmentCard}>
            <img src={doctor2} alt="Doctor 2" style={styles.doctorImage} />
            <div style={styles.appointmentDetails}>
              <p style={styles.doctorName}>Dr. John Smith</p>
              <p style={styles.appointmentTime}>30.10.2024 - 14:00</p>
            </div>
            <div style={styles.appointmentActions}>
              <button style={styles.cancelButton}>Cancel</button>
              <button style={styles.detailButton}>Detail</button>
            </div>
          </div>
          <h2 style={styles.sectionTitle}>Past</h2>
          <div style={styles.appointmentCard}>
            <img src={doctor3} alt="Doctor 3" style={styles.doctorImage} />
            <div style={styles.appointmentDetails}>
              <p style={styles.doctorName}>Dr. Alex Rivera</p>
              <p style={styles.appointmentTime}>11.08.2024 - 15:20</p>
            </div>
            <button style={styles.detailButton}>Detail</button>
          </div>
          {/* Additional Past Appointment */}
          <div style={styles.appointmentCard}>
            <img src={doctor4} alt="Doctor 4" style={styles.doctorImage} />
            <div style={styles.appointmentDetails}>
              <p style={styles.doctorName}>Dr. Sarah Lee</p>
              <p style={styles.appointmentTime}>10.08.2024 - 11:30</p>
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
    fontFamily: 'Arial',
    height: 'auto'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    borderRight: '1px solid #e6e6e6'
  },
  logo: {
    width: '200px',
    marginBottom: '-30px',
    marginTop: '-50px',
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
    display: 'flex',
    alignItems: 'center'
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#F8F9FA',
    height: '870px',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  headerTitle: {
    fontSize: '24px',
    color: '#023350',
    marginTop: '40px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center'
  },
  profileName: {
    fontSize: '16px',
    color: '#4F4F4F',
    marginTop: '40px',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '400px'
  },
  filter: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px'
  },
  dateInput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px'
  },
  appointmentSection: {
    marginTop: '45px',
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#023350',
    marginBottom: '20px'
  },
  appointmentCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    height: '90px',
    backgroundColor: '#FFF',
    borderRadius: '8px',
    border: '1px solid #e6e6e6',
    marginBottom: '10px'
  },
  doctorImage: {
    width: '65px',
    height: '70px',
    borderRadius: '50%',
    marginRight: '15px',
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