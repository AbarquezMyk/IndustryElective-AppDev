import React, { useState } from 'react';

const Calendar = () => {
    const [appointments, setAppointments] = useState({
        // Pre-defined sample appointments
        "2024-11-08": [{ title: "Check-up", details: "Routine health check-up", time: "10:00 AM", doctor: "Dr. Smith", room: "101", location: "Health Clinic" }]
    });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [role, setRole] = useState("user"); // Set role to "user" or "admin"
    const [newAppointment, setNewAppointment] = useState({ title: "", details: "", time: "", doctor: "", room: "", location: "" });

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedAppointments(appointments[date.toDateString()] || []);
    };

    const handleAddAppointment = () => {
        const dateKey = selectedDate.toDateString();
        setAppointments({
            ...appointments,
            [dateKey]: [...(appointments[dateKey] || []), newAppointment]
        });
        setIsModalVisible(false);
        setNewAppointment({ title: "", details: "", time: "", doctor: "", room: "", location: "" });
    };

    return (
        <div>
            <h1>Calendar</h1>
            <div>
                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                    {Array.from({ length: 30 }, (_, i) => {
                        const date = new Date(2024, 10, i + 1); // November 2024
                        return (
                            <div
                                key={i}
                                onClick={() => handleDateClick(date)}
                                style={{
                                    padding: '10px',
                                    backgroundColor: appointments[date.toDateString()] ? '#A7C0DA' : '#FFFFFF',
                                    cursor: 'pointer',
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.2)'
                                }}
                            >
                                <span>{date.getDate()}</span>
                                {appointments[date.toDateString()]?.map((appointment, i) => (
                                    <div key={i} style={{ fontSize: '10px', color: '#023350' }}>
                                        {appointment.title}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                {selectedDate && (
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#FFFFFF',
                        border: '2px solid #023350',
                        borderRadius: '8px',
                        marginTop: '20px',
                    }}>
                        <h3 style={{ color: '#023350' }}>Appointments on {selectedDate.toDateString()}</h3>
                        {selectedAppointments.length > 0 ? (
                            selectedAppointments.map((appointment, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <h4>{appointment.title}</h4>
                                    <p>Details: {appointment.details}</p>
                                    <p>Time: {appointment.time}</p>
                                    <p>Doctor: {appointment.doctor}</p>
                                    <p>Room: {appointment.room}</p>
                                    <p>Location: {appointment.location}</p>
                                </div>
                            ))
                        ) : (
                            <p>No appointments for this date.</p>
                        )}
                    </div>
                )}

                {/* Add Appointment Button for All Roles */}
                <button
                    onClick={() => setIsModalVisible(true)}
                    style={{
                        backgroundColor: '#023350',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Add Appointment
                </button>

                {isModalVisible && (
                    <div style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '400px',
                            padding: '20px',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{
                                fontSize: '24px',
                                color: '#023350',
                                marginBottom: '10px'
                            }}>Add Appointment</h2>
                            {['title', 'details', 'time', 'doctor', 'room', 'location'].map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    value={newAppointment[field]}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    onChange={(e) => setNewAppointment({ ...newAppointment, [field]: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        margin: '5px 0',
                                        borderRadius: '4px',
                                        border: '1px solid #CED4DA'
                                    }}
                                />
                            ))}
                            <button onClick={handleAddAppointment} style={{
                                width: '100%',
                                backgroundColor: '#023350',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '10px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}>
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
