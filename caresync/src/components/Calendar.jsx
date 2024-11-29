import React, { useState } from "react";

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

const HoverButton = ({ style, children, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hoverStyle = {
        transform: "scale(1.05)",
        boxShadow: "0 6px 10px rgba(0, 0, 0, 0.2)",
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
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const [viewingAppointment, setViewingAppointment] = useState(null);
    const [newAppointment, setNewAppointment] = useState({
        title: "",
        details: "",
        time: "",
        doctor: "",
        room: "",
        location: "",
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [validationMessage, setValidationMessage] = useState("");

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

    const buttonStyle = {
        background: "#F2F2F2",
        color: "#023350",
        border: "1px solid #C5C5C5",
        padding: "10px 16px",
        borderRadius: "25px",
        fontSize: "14px",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const addButtonStyle = {
        ...buttonStyle,
        background: "#D9E5F0",
        borderColor: "#A6B9D7",
    };

    const saveButtonStyle = {
        ...buttonStyle,
        background: "#B5D2E1",
        borderColor: "#90B4C9",
    };

    const inputStyle = {
        margin: "10px 0",
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #C5C5C5",
    };

    const handleSaveAppointment = () => {
        const { title, details, time, doctor, room, location } = newAppointment;
        if (!title || !details || !time || !doctor || !room || !location) {
            setValidationMessage("Please fill out all fields before saving.");
            return;
        }

        setAppointments((prev) => {
            const dateKey = selectedDate ? selectedDate.toDateString() : "";
            const newAppointments = { ...prev };
            if (dateKey) {
                newAppointments[dateKey] = newAppointments[dateKey] || [];
                newAppointments[dateKey].push(newAppointment);
            }
            return newAppointments;
        });

        setNewAppointment({
            title: "",
            details: "",
            time: "",
            doctor: "",
            room: "",
            location: "",
        });
        setValidationMessage("");
        setIsModalVisible(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
            <div
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    padding: "30px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        color: "#023350",
                        textAlign: "center",
                        marginBottom: "20px",
                        lineHeight: "1.4",
                        letterSpacing: "0.4em",
                    }}
                >
                    CALENDAR
                </h1>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <HoverButton style={buttonStyle} onClick={goToPreviousMonth}>
                        ← Previous
                    </HoverButton>
                    <h2
                        style={{
                            color: "#023350",
                            fontSize: "20px",
                            fontWeight: "600",
                        }}
                    >
                        {new Date(today.getFullYear(), currentMonth).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>
                    <HoverButton style={buttonStyle} onClick={goToNextMonth}>
                        Next →
                    </HoverButton>
                </div>

                <div
                    className="calendar-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7, 1fr)",
                        gridTemplateRows: "repeat(6, 1fr)",
                        gap: "10px",
                        padding: "20px",
                        border: "2px solid #023350",
                        borderRadius: "8px",
                        backgroundColor: "#F0F4F8",
                        width: "100%",
                    }}
                >
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                    <div
                        key={day}
                        style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#023350",
                            padding: "10px",
                            backgroundColor: "#F2F2F2",
                            borderRadius: "8px",
                        }}
                    >
                        {day}
                    </div>
                ))}

{monthDays.map((date, index) => {
    const dateKey = date ? date.toDateString() : null;
    const hasAppointments =
        dateKey && appointments[dateKey] && appointments[dateKey].length > 0;

    const isCurrentDate = date && date.toDateString() === today.toDateString();

    return (
        <div
            key={index}
            onClick={() => date && handleDateClick(date)}
            style={{
                position: "relative", // Added for positioning the badge
                padding: "15px",
                textAlign: "center",
                cursor: date ? "pointer" : "default",
                backgroundColor:
                    selectedDate && date && date.toDateString() === selectedDate.toDateString()
                        ? "#023350"
                        : isCurrentDate
                        ? "#B5D2E1" // Updated to fit overall motifs
                        : "transparent",
                color:
                    selectedDate && date && date.toDateString() === selectedDate.toDateString()
                        ? "#FFFFFF"
                        : isCurrentDate
                        ? "#023350"
                        : "#023350",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
                pointerEvents: date ? "auto" : "none",
            }}
        >
                {date ? (
                    <>
                        <div>{date.getDate()}</div>

                        {hasAppointments && (
                            <div
                                style={{
                                    position: "absolute", // Positioning the badge on the side
                                    top: "5px",
                                    right: "-10px", // Adjust the position to the right of the cell
                                    backgroundColor: "#FF6347",
                                    color: "#FFFFFF",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "12px",
                                    lineHeight: "20px",
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();  // Prevent the date click from firing
                                    setViewingAppointment(appointments[dateKey][0]); // Display first appointment
                                }}
                                title={`${appointments[dateKey].length} appointments`} // Tooltip
                            >
                                {appointments[dateKey].length}
                            </div>
                        )}
                    </>
                ) : (
                    ""
                )}
            </div>
        );
    })}
                </div>
                {viewingAppointment && (
    <div
        style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "9999",
            background: "#FFFFFF",
            padding: "20px",
            borderRadius: "12px", // Consistent with other rounded corners
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // More prominent shadow
            width: "600px",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh",
            overflowY: "auto", // Makes the modal scrollable if content exceeds the view
        }}
    >
        <h3
            style={{
                color: "#023350",
                fontSize: "22px", // Slightly larger for emphasis
                marginBottom: "20px", // More breathing space
                textAlign: "center",
                fontWeight: "bold",
            }}
        >
            Appointment Details
        </h3>

        <div
            style={{
                marginBottom: "10px",
                fontSize: "16px", // Consistent text size with other content
                color: "#023350",
            }}
        >
            <strong>Title:</strong> {viewingAppointment.title}
        </div>

        <div
            style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#023350",
            }}
        >
            <strong>Time:</strong> {viewingAppointment.time}
        </div>

        <div
            style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#023350",
            }}
        >
            <strong>Doctor:</strong> {viewingAppointment.doctor}
        </div>

        <div
            style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#023350",
            }}
        >
            <strong>Room:</strong> {viewingAppointment.room}
        </div>

        <div
            style={{
                marginBottom: "10px",
                fontSize: "16px",
                color: "#023350",
            }}
        >
            <strong>Location:</strong> {viewingAppointment.location}
        </div>

        <div
            style={{
                marginBottom: "20px",
                fontSize: "16px",
                color: "#023350",
            }}
        >
            <strong>Details:</strong> {viewingAppointment.details}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <HoverButton
                style={{
                    ...buttonStyle,
                    padding: "12px 24px",
                    fontSize: "16px",
                    marginRight: "10px",
                }}
                onClick={() => setViewingAppointment(null)}
            >
                Close
            </HoverButton>
        </div>
    </div>
)}



                <div style={{ marginTop: "20px", width: "100%" }}>
                    {selectedDate ? (
                        selectedAppointments.length > 0 ? (
                            <>
                                <h3>
                                Appointments for{" "}
                                {selectedDate.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                    </h3>
                                    {selectedAppointments.map((appointment, idx) => (
                                        <div key={idx}>
                                            <p>{appointment.title}</p>
                                            <p>{appointment.time}</p>
                                            <p>{appointment.doctor}</p>
                                            <p>{appointment.room}</p>
                                            <p>{appointment.location}</p>
                                        </div>
                                    ))}
                                </>
                            ) : (
                            <p>
                            No appointments for{" "}
                                {selectedDate.toLocaleDateString("en-US", {
                                weekday: "long", // Full day name
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                        })}
                    </p>
                        )
                    ) : (
                        <p>Please select a date to view appointments</p>
                    )}
                </div>

                {selectedDate && (
                    <div>
                        <button onClick={() => setIsModalVisible(true)} style={addButtonStyle}>
                            Add Appointment
                        </button>
                    </div>
                )}

                {isModalVisible && (
    <div
        style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "9999",
            background: "#FFFFFF",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
            width: "600px", // Increased width
            display: "flex",
            flexDirection: "column",
        }}
    >
        <h3
            style={{
                fontSize: "20px", // Adjusted font size
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#023350",
                textAlign: "center",
            }}
        >
            Add Appointment for{" "}
            {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
        </h3>
        <div style={{ marginBottom: "10px" }}>
            {validationMessage && <p style={{ color: "red", fontSize: "14px" }}>{validationMessage}</p>}
        </div>
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px", // Space between columns
                marginBottom: "15px",
            }}
        >
            <div>
                <label
                    style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#023350",
                        fontSize: "14px",
                    }}
                >
                    Title
                </label>
                <input
                    type="text"
                    placeholder="Title"
                    value={newAppointment.title}
                    onChange={(e) =>
                        setNewAppointment((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }
                    style={{
                        ...inputStyle,
                        fontSize: "14px",
                        padding: "8px",
                    }}
                />
            </div>
            <div>
                <label
                    style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#023350",
                        fontSize: "14px",
                    }}
                >
                    Time
                </label>
                <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) =>
                        setNewAppointment((prev) => ({
                            ...prev,
                            time: e.target.value,
                        }))
                    }
                    style={{
                        ...inputStyle,
                        fontSize: "14px",
                        padding: "8px",
                    }}
                />
            </div>
            <div>
                <label
                    style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#023350",
                        fontSize: "14px",
                    }}
                >
                    Doctor
                </label>
                <input
                    type="text"
                    placeholder="Dr. John Doe"
                    value={newAppointment.doctor}
                    onChange={(e) =>
                        setNewAppointment((prev) => ({
                            ...prev,
                            doctor: e.target.value,
                        }))
                    }
                    style={{
                        ...inputStyle,
                        fontSize: "14px",
                        padding: "8px",
                    }}
                />
            </div>
            <div>
                <label
                    style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#023350",
                        fontSize: "14px",
                    }}
                >
                    Room
                </label>
                <input
                    type="text"
                    placeholder="Room 101"
                    value={newAppointment.room}
                    onChange={(e) =>
                        setNewAppointment((prev) => ({
                            ...prev,
                            room: e.target.value,
                        }))
                    }
                    style={{
                        ...inputStyle,
                        fontSize: "14px",
                        padding: "8px",
                    }}
                />
            </div>
            <div>
                <label
                    style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#023350",
                        fontSize: "14px",
                    }}
                >
                    Details
                </label>
                <textarea
                    placeholder="Details"
                    value={newAppointment.details}
                    onChange={(e) =>
                        setNewAppointment((prev) => ({
                            ...prev,
                            details: e.target.value,
                        }))
                    }
                    style={{
                        ...inputStyle,
                        fontSize: "14px",
                        padding: "8px",
                        height: "60px",
                    }}
                />
            </div>
            <div>
                <label
                    style={{
                        display: "block",
                        marginBottom: "5px",
                        color: "#023350",
                        fontSize: "14px",
                    }}
                >
                    Location
                </label>
                <input
                    type="text"
                    placeholder="Building A, Floor 3"
                    value={newAppointment.location}
                    onChange={(e) =>
                        setNewAppointment((prev) => ({
                            ...prev,
                            location: e.target.value,
                        }))
                    }
                    style={{
                        ...inputStyle,
                        fontSize: "14px",
                        padding: "8px",
                    }}
                />
            </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
            <HoverButton
                style={{
                    ...saveButtonStyle,
                    padding: "10px 20px",
                    fontSize: "14px",
                }}
                onClick={handleSaveAppointment}
            >
                Save
            </HoverButton>
            <HoverButton
                style={{
                    ...buttonStyle,
                    padding: "10px 20px",
                    fontSize: "14px",
                }}
                onClick={() => setIsModalVisible(false)}
            >
                Cancel
            </HoverButton>
        </div>
    </div>
)}

            </div>
        </div>
    );
};

export default Calendar;
