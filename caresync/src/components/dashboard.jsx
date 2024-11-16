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

const dashboard = () => {
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
          <Link to="/" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Log Out</Link>
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

export default dashboard;