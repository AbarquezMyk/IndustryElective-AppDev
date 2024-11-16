import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

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
