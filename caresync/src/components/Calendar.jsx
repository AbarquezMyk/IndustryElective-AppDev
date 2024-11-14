import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

const Sidebar = () => (
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

const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    const startDay = date.getDay();

    for (let i = 0; i < startDay; i++) days.push(null);
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    while (days.length % 7 !== 0) days.push(null);
    return days;
};

const Calendar = () => {
    const [appointments, setAppointments] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ title: '', details: '', time: '', doctor: '', room: '', location: '' });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const monthDays = getDaysInMonth(currentMonth, today.getFullYear());

    const goToPreviousMonth = () => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    const goToNextMonth = () => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));

    const handleDateClick = (date) => {
        if (date) {
            setSelectedDate(date);
            const dateKey = date.toDateString();
            setSelectedAppointments(appointments[dateKey] || []);
        }
    };

    const handleAddAppointment = () => {
        const dateKey = selectedDate.toDateString();
        const updatedAppointments = { ...appointments };
        if (!updatedAppointments[dateKey]) updatedAppointments[dateKey] = [];
        updatedAppointments[dateKey].push({ ...newAppointment });
        setAppointments(updatedAppointments);
        setNewAppointment({ title: '', details: '', time: '', doctor: '', room: '', location: '' });
        setIsModalVisible(false);
    };

    return (
        <div style={{ display: 'flex', fontFamily: 'Manjari, sans-serif' }}>
            <Sidebar />
            <div style={{
                flex: '1',
                padding: '20px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#023350',
                    textAlign: 'center',
                    marginBottom: '20px',
                    lineHeight: '1.4',
                    letterSpacing: '10px'
                }}>
                    CALENDAR
                </h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>
                    <button onClick={goToPreviousMonth} style={{
                        backgroundColor: '#041E42',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>← Previous</button>
                    <h2 style={{ color: '#023350' }}>
                        {new Date(today.getFullYear(), currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={goToNextMonth} style={{
                        backgroundColor: '#023350',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>Next →</button>
                </div>

                <div className="calendar-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '10px',
                    padding: '20px',
                    border: '2px solid #023350',
                    borderRadius: '8px',
                    backgroundColor: '#F0F4F8',
                }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#023350'
                        }}>
                            {day}
                        </div>
                    ))}
                    {monthDays.map((date, index) => (
                        <div
                            key={index}
                            onClick={() => handleDateClick(date)}
                            style={{
                                padding: '10px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: date?.toDateString() === selectedDate?.toDateString() ? '#023350' : 'transparent',
                                color: date?.toDateString() === selectedDate?.toDateString() ? '#FFFFFF' : '#023350',
                                borderRadius: '4px'
                            }}
                        >
                            {date ? date.getDate() : ''}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h3>Appointments for {selectedDate?.toDateString() || "Select a Date"}</h3>
                    <ul>
                        {selectedAppointments.map((appt, idx) => (
                            <li key={idx}>
                                <strong>{appt.title}</strong> - {appt.time}
                                <p>{appt.details}</p>
                            </li>
                        ))}
                    </ul>
                    {selectedDate && (
                        <button
                            onClick={() => setIsModalVisible(true)}
                            style={{
                                marginTop: '10px',
                                padding: '10px 20px',
                                backgroundColor: '#023350',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Add Appointment
                        </button>
                    )}
                </div>

                {isModalVisible && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '400px',
                            textAlign: 'center'
                        }}>
                            <h3>Add New Appointment for {selectedDate?.toDateString()}</h3>
                            <input
                                type="text"
                                placeholder="Title"
                                value={newAppointment.title}
                                onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                                style={{ margin: '10px 0', width: '100%', padding: '10px' }}
                            />
                            <textarea
                                placeholder="Details"
                                value={newAppointment.details}
                                onChange={(e) => setNewAppointment({ ...newAppointment, details: e.target.value })}
                                style={{ margin: '10px 0', width: '100%', padding: '10px' }}
                            />
                            <button
                                onClick={handleAddAppointment}
                                style={{
                                    marginTop: '10px',
                                    padding: '10px 20px',
                                    backgroundColor: '#023350',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Save Appointment
                            </button>
                        </div>
                    </div>
                )}
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
      display: 'flex',
      alignItems: 'center',
    },
    calendarNavItem: {
      padding: '15px 20px',
      fontSize: '16px',
      color: '#4F4F4F',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      borderRadius: '8px',
      border: '1.5px solid #023350',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
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

export default Calendar;
