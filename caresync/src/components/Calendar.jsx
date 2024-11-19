import React, { useState } from 'react';

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

// Button Component with hover effect
const HoverButton = ({ style, children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
    };
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...style, ...(isHovered ? hoverStyle : {}) }}
        >
            {children}
        </button>
    );
};

const Calendar = () => {
    const [appointments, setAppointments] = useState({});
    const [selectedDate, setSelectedDate] = useState(null); // Keep selectedDate as null initially
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ title: '', details: '', time: '', doctor: '', room: '', location: '' });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAppointmentDetailsVisible, setIsAppointmentDetailsVisible] = useState(false); // For appointment detail modal
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null); // Store the selected appointment details

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const monthDays = getDaysInMonth(currentMonth, today.getFullYear());

    const goToPreviousMonth = () => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    const goToNextMonth = () => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));

    const handleDateClick = (date) => {
        if (date) {
            setSelectedDate(date); // Highlight the clicked date
            const dateKey = date.toDateString();
            setSelectedAppointments(appointments[dateKey] || []);
        }
    };

    const handleAppointmentClick = (appointment) => {
        setSelectedAppointmentDetails(appointment);
        setIsAppointmentDetailsVisible(true); // Show the appointment details modal
    };

    const buttonStyle = {
        background: '#F2F2F2',
        color: '#023350',
        border: '1px solid #C5C5C5',
        padding: '10px 16px',
        borderRadius: '25px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const addButtonStyle = {
        ...buttonStyle,
        background: '#D9E5F0',
        borderColor: '#A6B9D7',
    };

    const saveButtonStyle = {
        ...buttonStyle,
        background: '#B5D2E1',
        borderColor: '#90B4C9',
    };

    const navButtonStyle = {
        background: '#F2F2F2',
        color: '#023350',
        border: '1px solid #C5C5C5',
        padding: '8px 12px',
        borderRadius: '25px',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        margin: '10px 0',
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #C5C5C5',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                padding: '30px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#023350',
                    textAlign: 'center',
                    marginBottom: '20px',
                    lineHeight: '1.4',
                    letterSpacing: '0.4em',
                    width: '100%',
                }}>
                    CALENDAR
                </h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                }}>
                    <HoverButton style={buttonStyle} onClick={goToPreviousMonth}>
                        ← Previous
                    </HoverButton>
                    <h2 style={{
                        color: '#023350',
                        fontSize: '20px',
                        fontWeight: '600',
                        flex: 1,
                        textAlign: 'center',
                    }}>
                        {new Date(today.getFullYear(), currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <HoverButton style={buttonStyle} onClick={goToNextMonth}>
                        Next →
                    </HoverButton>
                </div>

                <div className="calendar-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridTemplateRows: 'repeat(6, 1fr)',
                    gap: '10px',
                    padding: '20px',
                    border: '2px solid #023350',
                    borderRadius: '8px',
                    backgroundColor: '#F0F4F8',
                    width: '100%',
                }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#023350',
                            padding: '10px',
                            backgroundColor: '#F2F2F2',
                            borderRadius: '8px',
                        }}>
                            {day}
                        </div>
                    ))}
                    {monthDays.map((date, index) => {
                        const dateKey = date ? date.toDateString() : null;
                        const hasAppointments = dateKey && appointments[dateKey] && appointments[dateKey].length > 0;
                        return (
                            <div
                                key={index}
                                onClick={() => date && handleDateClick(date)} // Only attach onClick if date exists
                                style={{
                                    padding: '15px',
                                    textAlign: 'center',
                                    cursor: date ? 'pointer' : 'default',
                                    backgroundColor: selectedDate && date && date.toDateString() === selectedDate.toDateString()
                                        ? '#023350'  // Apply blue background only if selected date matches
                                        : 'transparent', // No background color on initial render
                                    color: selectedDate && date && date.toDateString() === selectedDate.toDateString()
                                        ? '#FFFFFF' // Change text color when selected
                                        : '#023350',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s ease',
                                    pointerEvents: date ? 'auto' : 'none',
                                }}
                            >
                                {date ? (
                                    <>
                                        {date.getDate()}
                                        {hasAppointments && (
                                            <div
                                                style={{ fontSize: '12px', color: '#FF6347', marginTop: '5px', cursor: 'pointer' }}
                                                onClick={() => handleAppointmentClick(appointments[dateKey][0])} // Show the first appointment details
                                            >
                                                Appointments
                                            </div>
                                        )}
                                    </>
                                ) : ''}
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: '20px', width: '100%' }}>
                    <h3 style={{ color: '#023350', fontSize: '18px', fontWeight: '600' }}>
                        Appointments for {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {selectedAppointments.map((appointment, index) => (
                            <div key={index} style={{
                                padding: '12px',
                                borderRadius: '8px',
                                backgroundColor: '#F9F9F9',
                                marginBottom: '10px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                            }} onClick={() => handleAppointmentClick(appointment)}>
                                <h4>{appointment.title}</h4>
                                <p>{appointment.time}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <HoverButton
                            style={addButtonStyle}
                            onClick={() => setIsModalVisible(true)}
                        >
                            Add Appointment
                        </HoverButton>
                    </div>
                </div>
            </div>

            {/* Appointment Details Modal */}
            {isAppointmentDetailsVisible && selectedAppointmentDetails && (
                <div className="modal" style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: '#FFFFFF',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '400px',
                    }}>
                        <h3>Appointment Details</h3>
                        <p><strong>Title:</strong> {selectedAppointmentDetails.title}</p>
                        <p><strong>Details:</strong> {selectedAppointmentDetails.details}</p>
                        <p><strong>Time:</strong> {selectedAppointmentDetails.time}</p>
                        <p><strong>Doctor:</strong> {selectedAppointmentDetails.doctor}</p>
                        <p><strong>Room:</strong> {selectedAppointmentDetails.room}</p>
                        <p><strong>Location:</strong> {selectedAppointmentDetails.location}</p>
                        <HoverButton
                            style={buttonStyle}
                            onClick={() => setIsAppointmentDetailsVisible(false)}
                        >
                            Close
                        </HoverButton>
                    </div>
                </div>
            )}

            {/* Add Appointment Modal */}
            {isModalVisible && (
                <div className="modal" style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div className="modal-content" style={{
                        backgroundColor: '#FFFFFF',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '400px',
                    }}>
                        <h3>Add Appointment</h3>
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Title"
                            value={newAppointment.title}
                            onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                        />
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Details"
                            value={newAppointment.details}
                            onChange={(e) => setNewAppointment({ ...newAppointment, details: e.target.value })}
                        />
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Time"
                            value={newAppointment.time}
                            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                        />
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Doctor"
                            value={newAppointment.doctor}
                            onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                        />
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Room"
                            value={newAppointment.room}
                            onChange={(e) => setNewAppointment({ ...newAppointment, room: e.target.value })}
                        />
                        <input
                            type="text"
                            style={inputStyle}
                            placeholder="Location"
                            value={newAppointment.location}
                            onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <HoverButton
                                style={saveButtonStyle}
                                onClick={() => {
                                    setAppointments(prev => {
                                        const dateKey = selectedDate ? selectedDate.toDateString() : '';
                                        const newAppointments = { ...prev };
                                        if (dateKey) {
                                            newAppointments[dateKey] = newAppointments[dateKey] || [];
                                            newAppointments[dateKey].push(newAppointment);
                                        }
                                        return newAppointments;
                                    });
                                    setIsModalVisible(false);
                                    setNewAppointment({ title: '', details: '', time: '', doctor: '', room: '', location: '' });
                                }}
                            >
                                Save
                            </HoverButton>
                            <HoverButton
                                style={buttonStyle}
                                onClick={() => setIsModalVisible(false)}
                            >
                                Cancel
                            </HoverButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
