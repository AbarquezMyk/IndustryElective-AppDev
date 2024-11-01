import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './img/Logo1.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';


// Sidebar component  
const Sidebar = () => (
    <div style={{
        width: '250px',
        backgroundColor: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid #CED4DA',
        height: '100vh',
        fontFamily: 'Manjari, sans-serif',
    }}>
        {/* Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <img src={logo} alt="Logo1" style={{ width: '60px', height: '60px', marginRight: '20px' }} />
            <h2 style={{
                color: '#023350',
                fontSize: '17px',
                fontWeight: 'normal',
                letterSpacing: '0.4em', // 40% letter spacing for CareSync
                margin: 0, // Remove default margin
                paddingLeft: '10px', // Added padding to align with other items
            }}>
                CareSync
            </h2>
        </div>

        {/* Menu Items */}
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {[
                { icon: dashboard, label: 'Dashboard', link: '/' },
                { icon: appointment, label: 'Appointments', link: '/AppointmentHistory' },
                { icon: calendar, label: 'Calendar', link: '/calendar', highlighted: true },
                { icon: payment, label: 'Payments', link: '/PaymentMethod' },
                { icon: setting, label: 'Settings', link: '/settings' },
            ].map((item, index) => (
                <li key={index} style={{
                    margin: '40px 0',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: item.highlighted ? 'transparent' : 'transparent',
                    borderRadius: '8px',
                    padding: '10px',
                    border: item.highlighted ? '2px solid #023350' : 'none', // Stroke effect
                }}>
                    <img src={item.icon} alt={`${item.label} Icon`} style={{ width: '20px', height: '20px', marginRight: '15px', paddingLeft: '20px' }} />
                    <Link to={item.link} style={{
                        textDecoration: 'none',
                        color: '#023350',
                        fontSize: '16px',
                        letterSpacing: '0.1em',
                        paddingLeft: '30px', // Aligns labels with "CareSync"
                    }}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>

        {/* Logout Button */}
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
                    padding: '10px 20px', // Aligns logout icon and text with other menu items
                }}
            >
                <img src={logout} alt="Logout Icon" style={{ width: '20px', height: '20px', marginRight: '10px', paddingLeft: '20px' }} /> {/* Added paddingLeft for logout icon */}
                <span style={{ paddingLeft: '30px' }}>Log Out</span> {/* Aligns with other labels */}
            </button>
        </div>
    </div>
);

  

// Calendar component
const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setModalVisible(true);
    };

    const handleAddEvent = () => {
        if (eventTitle) {
            const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
            const newEvents = { ...events, [dateKey]: [...(events[dateKey] || []), eventTitle] };
            setEvents(newEvents);
            setEventTitle('');
            setModalVisible(false);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: '1', padding: '40px', backgroundColor: '#F8F9FA' }}>
                <h1 style={{
                    fontSize: '50px',
                    fontWeight: 'bold',
                    color: '#023350',
                    textAlign: 'center',
                    marginBottom: '20px',
                    letterSpacing: '0.4em',
                    lineHeight: '1.4',
                }}>
                    CALENDAR
                </h1>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={handlePreviousMonth} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
                        &#9664;
                    </button>
                    <h2 style={{ fontSize: '20px', color: '#023350', margin: '0 20px' }}>{monthNames[currentMonth]} {currentYear}</h2>
                    <button onClick={handleNextMonth} style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
                        &#9654;
                    </button>
                </div>

                <div style={{
                    border: '1px solid #CED4DA',
                    borderRadius: '8px',
                    padding: '20px',
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                                    <th key={day} style={{
                                        padding: '15px',
                                        borderBottom: '1px solid #CED4DA',
                                        color: '#6C757D',
                                        fontSize: '16px',
                                        textAlign: 'center',
                                    }}>
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(6)].map((_, weekIndex) => (
                                <tr key={weekIndex}>
                                    {[...Array(7)].map((_, dayIndex) => {
                                        const day = weekIndex * 7 + dayIndex - startDay + 1;
                                        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;

                                        return (
                                            <td key={dayIndex} style={{ padding: '15px', textAlign: 'center', color: day > 0 && day <= daysInMonth ? '#023350' : '#CED4DA' }}>
                                                {day > 0 && day <= daysInMonth ? (
                                                    <div
                                                        onClick={() => handleDateClick(day)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            borderRadius: '8px',
                                                            padding: '5px',
                                                            transition: 'background-color 0.2s',
                                                            position: 'relative',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E0F7FA'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        {day}
                                                        {events[dateKey] && events[dateKey].map((event, index) => (
                                                            <div key={index} style={{
                                                                backgroundColor: '#BBDEFB',
                                                                padding: '5px',
                                                                borderRadius: '5px',
                                                                marginTop: '5px',
                                                                fontSize: '12px',
                                                                textAlign: 'center',
                                                            }}>
                                                                {event}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span>{day}</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {modalVisible && (
                    <div style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '300px',
                            textAlign: 'center',
                        }}>
                            <h3>Add Event</h3>
                            <input
                                type="text"
                                placeholder="Event Title"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    border: '1px solid #CED4DA',
                                    borderRadius: '5px',
                                }}
                            />
                            <button onClick={handleAddEvent} style={{
                                backgroundColor: '#023350',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px',
                                cursor: 'pointer',
                                width: '100%',
                            }}>
                                Add Event
                            </button>
                            <button onClick={() => setModalVisible(false)} style={{
                                backgroundColor: 'transparent',
                                color: '#E74C3C',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: '10px',
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;