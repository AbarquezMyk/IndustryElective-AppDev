// Sidebar.js
import React from 'react';
import { NavLink } from "react-router-dom";
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

const Sidebar = ({ handleLogout }) => {
  return (
    <div style={styles.sidebar}>
      <img src={logo} alt="CareSync Logo" style={styles.logo} />
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
            >
              <img src={dashboard} alt="Dashboard" style={styles.navIcon} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/appointment-history"
              style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
            >
              <img src={appointment} alt="Appointments" style={styles.navIcon} />
              Appointments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calendar"
              style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
            >
              <img src={calendar} alt="Calendar" style={styles.navIcon} />
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/credit-card"
              style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
            >
              <img src={payment} alt="Payments" style={styles.navIcon} />
              Payments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              style={({ isActive }) => isActive ? { ...styles.navItem, ...styles.activeNavItem } : styles.navItem}
            >
              <img src={setting} alt="Settings" style={styles.navIcon} />
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div style={styles.logout}>
        <img src={logout} alt="Log Out" style={styles.navIcon} />
        <NavLink to="/" onClick={handleLogout} style={styles.navItem}>
          Log Out
        </NavLink>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    borderRight: '1px solid #e6e6e6',
  },
  logo: {
    width: '150px',
    marginBottom: '20px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    fontSize: '16px',
    color: '#4F4F4F',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
    borderRadius: '8px',
  },
  activeNavItem: {
    border: '1.5px solid #023350',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: '#023350',
    fontWeight: 'bold',
  },
  navIcon: {
    width: '20px',
    height: '20px',
    marginRight: '30px',
  },
  logout: {
    marginTop: 'auto',
    marginBottom: '50px',
    color: 'red',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Sidebar;
