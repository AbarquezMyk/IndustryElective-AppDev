import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/Logo1.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

const Sidebar = () => (
    <div style={{
        width: '250px',
        backgroundColor: '#F0F4F8',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid #CED4DA',
        height: '100vh',
        fontFamily: 'Manjari, sans-serif',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <img src={logo} alt="Logo1" style={{ width: '60px', height: '60px', marginRight: '20px' }} />
            <h2 style={{
                color: '#023350',
                fontSize: '17px',
                fontWeight: 'normal',
                letterSpacing: '0.4em',
                margin: 0,
                paddingLeft: '10px',
            }}>
                CareSync
            </h2>
        </div>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {[{
                icon: dashboard, label: 'Dashboard', link: '/'
            }, {
                icon: appointment, label: 'Appointments', link: '/appointment-history'
            }, {
                icon: calendar, label: 'Calendar', link: '/calendar', highlighted: true
            }, {
                icon: payment, label: 'Payments', link: '/payment-methods'
            }, {
                icon: setting, label: 'Settings', link: '/settings'
            }].map((item, index) => (
                <li key={index} style={{
                    margin: '40px 0',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '8px',
                    padding: '10px',
                    border: item.highlighted ? '2px solid #023350' : 'none',
                }}>
                    <img src={item.icon} alt={`${item.label} Icon`} style={{ width: '20px', height: '20px', marginRight: '15px', paddingLeft: '20px' }} />
                    <Link to={item.link} style={{
                        textDecoration: 'none',
                        color: '#023350',
                        fontSize: '16px',
                        letterSpacing: '0.1em',
                        paddingLeft: '30px',
                    }}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
        <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: '20px' }}>
            <button
                onClick={() => console.log("Logout")}
                style={{
                    color: '#E74C3C',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    letterSpacing: '0.1em',
                    fontSize: '16px',
                    padding: '10px 20px',
                    fontFamily: 'Manjari, sans-serif',
                }}
            >
                <img src={logout} alt="Logout Icon" style={{ width: '20px', height: '20px', marginRight: '10px', paddingLeft: '20px' }} />
                <span style={{ paddingLeft: '30px' }}>Log Out</span>
            </button>
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

export default Calendar;
