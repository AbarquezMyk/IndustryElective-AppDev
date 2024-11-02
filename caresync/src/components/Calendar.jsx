import React, { useEffect, useState } from 'react';
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
                letterSpacing: '0.4em',
                margin: 0,
                paddingLeft: '10px',
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
                    padding: '10px 20px',
                }}
            >
                <img src={logout} alt="Logout Icon" style={{ width: '20px', height: '20px', marginRight: '10px', paddingLeft: '20px' }} />
                <span style={{ paddingLeft: '30px' }}>Log Out</span>
            </button>
        </div>
    </div>
);

//Calendar 

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [eventToEdit, setEventToEdit] = useState('');

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/events/${currentYear}/${currentMonth + 1}`);
                const data = await response.json();
                const formattedEvents = data.reduce((acc, event) => {
                    const dateKey = `${event.year}-${event.month}-${event.day}`;
                    acc[dateKey] = acc[dateKey] ? [...acc[dateKey], { id: event.id, title: event.title }] : [{ id: event.id, title: event.title }];
                    return acc;
                }, {});
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [currentMonth, currentYear]);

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

    const handleAddEvent = async () => {
        if (eventTitle) {
            const newEvent = {
                title: eventTitle,
                year: currentYear,
                month: currentMonth + 1,
                day: selectedDate,
            };

            try {
                const response = await fetch('http://localhost:8080/api/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newEvent),
                });

                const addedEvent = await response.json();
                const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
                const newEvents = { ...events, [dateKey]: [...(events[dateKey] || []), { id: addedEvent.id, title: eventTitle }] };

                setEvents(newEvents);
                setEventTitle('');
                setModalVisible(false);
            } catch (error) {
                console.error('Error adding event:', error);
            }
        }
    };

    const handleEventClick = (event) => {
        setEventToEdit(event.title);
        setSelectedEventId(event.id);
        setEventDetailsVisible(true);
    };

    const handleEditEvent = async () => {
        if (eventToEdit) {
            const updatedEvent = {
                id: selectedEventId,
                title: eventToEdit,
                year: currentYear,
                month: currentMonth + 1,
                day: selectedDate,
            };

            try {
                await fetch(`http://localhost:8080/api/events/${selectedEventId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedEvent),
                });

                const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
                const updatedEvents = {
                    ...events,
                    [dateKey]: events[dateKey].map(event => event.id === selectedEventId ? { ...event, title: eventToEdit } : event)
                };

                setEvents(updatedEvents);
                setEventToEdit('');
                setEventDetailsVisible(false);
            } catch (error) {
                console.error('Error updating event:', error);
            }
        }
    };

    const handleDeleteEvent = async () => {
        try {
            await fetch(`http://localhost:8080/api/events/${selectedEventId}`, {
                method: 'DELETE',
            });

            const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDate}`;
            const updatedEvents = {
                ...events,
                [dateKey]: events[dateKey].filter(event => event.id !== selectedEventId),
            };

            setEvents(updatedEvents);
            setEventDetailsVisible(false);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: '1', padding: '20px', backgroundColor: '#F8F9FA' }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#023350',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>
                    CALENDAR
                </h1>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={handlePreviousMonth} style={{
                        fontSize: '16px',
                        backgroundColor: '#E9ECEF',
                        border: '1px solid #CED4DA',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        marginRight: '10px',
                        color: '#023350',
                        transition: 'background-color 0.3s',
                    }}>
                        ◀
                    </button>
                    <h2 style={{ fontSize: '20px', color: '#023350', margin: '0 20px' }}>{monthNames[currentMonth]} {currentYear}</h2>
                    <button onClick={handleNextMonth} style={{
                        fontSize: '16px',
                        backgroundColor: '#E9ECEF',
                        border: '1px solid #CED4DA',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        marginLeft: '10px',
                        color: '#023350',
                        transition: 'background-color 0.3s',
                    }}>
                        ▶
                    </button>
                </div>

                <div style={{
                    border: '1px solid #CED4DA',
                    borderRadius: '8px',
                    padding: '10px',
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <th key={day} style={{
                                        padding: '5px',
                                        borderBottom: '1px solid #CED4DA',
                                        color: '#6C757D',
                                        fontSize: '14px',
                                        textAlign: 'center',
                                    }}>
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 6 }, (_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Array.from({ length: 7 }, (_, dayIndex) => {
                                        const day = rowIndex * 7 + dayIndex - startDay + 1;
                                        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
                                        const dayEvents = events[dateKey] || [];

                                        return (
                                            <td key={dayIndex} style={{
                                                padding: '5px',
                                                border: '1px solid #CED4DA',
                                                textAlign: 'center',
                                                cursor: day > 0 && day <= daysInMonth ? 'pointer' : 'not-allowed',
                                                backgroundColor: day > 0 && day <= daysInMonth ? '#FFFFFF' : '#F8F9FA',
                                                position: 'relative',
                                                height: '60px',
                                                width: '60px',
                                            }} onClick={() => day > 0 && day <= daysInMonth ? handleDateClick(day) : null}>
                                                <div style={{ fontWeight: 'bold', color: '#023350' }}>{day > 0 && day <= daysInMonth ? day : ''}</div>
                                                <div>
                                                    {dayEvents.map(event => (
                                                        <div key={event.id} onClick={(e) => {
                                                            e.stopPropagation(); // Prevents triggering the date click event
                                                            handleEventClick(event);
                                                        }} style={{
                                                            backgroundColor: '#6C757D',
                                                            color: '#FFFFFF',
                                                            borderRadius: '4px',
                                                            padding: '2px 4px',
                                                            margin: '2px 0',
                                                            fontSize: '12px',
                                                            textAlign: 'left',
                                                            cursor: 'pointer',
                                                        }}>
                                                            {event.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal for adding events */}
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
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '300px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        }}>
                            <h3>Add Event</h3>
                            <input
                                type="text"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                                placeholder="Event Title"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #CED4DA',
                                    marginBottom: '10px',
                                }}
                            />
                            <button onClick={handleAddEvent} style={{
                                backgroundColor: '#28A745',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%',
                            }}>
                                Add Event
                            </button>
                            <button onClick={() => setModalVisible(false)} style={{
                                backgroundColor: '#DC3545',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%',
                                marginTop: '10px',
                            }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal for editing event details */}
                {eventDetailsVisible && (
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
                            backgroundColor: '#FFFFFF',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '300px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        }}>
                            <h3>Edit Event</h3>
                            <input
                                type="text"
                                value={eventToEdit}
                                onChange={(e) => setEventToEdit(e.target.value)}
                                placeholder="Event Title"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #CED4DA',
                                    marginBottom: '10px',
                                }}
                            />
                            <button onClick={handleEditEvent} style={{
                                backgroundColor: '#28A745',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%',
                            }}>
                                Update Event
                            </button>
                            <button onClick={handleDeleteEvent} style={{
                                backgroundColor: '#DC3545',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%',
                                marginTop: '10px',
                            }}>
                                Delete Event
                            </button>
                            <button onClick={() => setEventDetailsVisible(false)} style={{
                                backgroundColor: '#6C757D',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '10px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                width: '100%',
                                marginTop: '10px',
                            }}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
