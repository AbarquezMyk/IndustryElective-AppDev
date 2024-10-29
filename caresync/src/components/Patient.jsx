import React from 'react';
import logo from './logo.png'; // Ensure this path is correct
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Patient() {
  return (
    <div style={styles.profilePage}>
      <header style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.headerText}>Patient's Profile</h1>
      </header>

      <div style={styles.profileContent}>
        <div style={styles.leftPanel}>
          <div style={styles.contactDetails}>
            <div style={styles.profilePic}>
              <i className="fas fa-user-circle" style={styles.userIcon}></i>
            </div>
            <h2 style={styles.name}>Mr. Juan Dela Cruz</h2>
            <p style={styles.contactItem}><FaPhone /> 09123789654</p>
            <p style={styles.contactItem}><FaEnvelope /> juandelacruz@gmail.com</p>
            <p style={styles.contactItem}><FaMapMarkerAlt /> Natalio B. Bacalso Ave, Cebu City</p>
          </div>
          
          <div style={styles.labResults}>
            <h3 style={styles.sectionTitle}>Latest Lab Results:</h3>
            <p style={styles.resultItem}>📄 Blood Test ABC, 0.7 MB</p>
            <p style={styles.resultItem}>📄 Blood Test XYZ, 0.7 MB</p>
          </div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.overview}>
            <h3 style={styles.sectionTitle}>Overview:</h3>
            <p style={styles.overviewItem}>Gender: Male</p>
            <p style={styles.overviewItem}>Date of Birth: 01/02/2022</p>
            <p style={styles.overviewItem}>Allergies: Peanuts, Shellfish</p>
            <p style={styles.overviewItem}>Previous Visit: 08/02/2024</p>
            <p style={styles.overviewItem}>Next Visit: 10/02/2024</p>
            <p style={styles.overviewItem}>Next Kin: Gianne Dela Cruz</p>
          </div>

          <div style={styles.buttonsGrid}>
            <button style={styles.button}>Appointments</button>
            <button style={styles.button}>Billings</button>
            <button style={styles.button}>Tests & Results</button>
            <button style={styles.button}>Treatment</button>
            <button style={styles.button}>Doctors</button>
            <button style={styles.button}>Partner Profile</button>
            <button style={styles.button}>Vital Signs</button>
            <button style={styles.button}>Consent Forms</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  profilePage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f8f8f8',
    padding: '20px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: '20px'
  },
  logo: {
    width: '50px',
    marginRight: '10px'
  },
  headerText: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  profileContent: {
    display: 'flex',
    maxWidth: '900px',
    width: '100%',
    gap: '20px'
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  contactDetails: {
    marginBottom: '20px'
  },
  profilePic: {
    fontSize: '50px',
    color: '#4F4F4F',
    marginBottom: '10px'
  },
  userIcon: {
    fontSize: '50px',
    color: '#4F4F4F'
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0'
  },
  contactItem: {
    margin: '5px 0',
    fontSize: '16px'
  },
  labResults: {
    marginBottom: '20px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px'
  },
  overview: {
    marginBottom: '20px'
  },
  overviewItem: {
    fontSize: '16px',
    margin: '5px 0'
  },
  buttonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  button: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default Patient;