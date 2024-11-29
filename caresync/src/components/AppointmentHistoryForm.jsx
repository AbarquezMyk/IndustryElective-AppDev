import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AppointmentForm = () => {
  const location = useLocation();
  const { doctorId, doctorName, doctorAmount } = location.state || {};

  const [appointmentData, setAppointmentData] = useState({
    doctorId: doctorId || "", // Initialize the doctorId in state
    doctorName: doctorName || "",
    appointmentDateTime: "",  // Combined date and time
    amount: doctorAmount || "",
    reason: "", // Added reason to the initial state
  });

  const [formStatus, setFormStatus] = useState({ success: false, error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { appointmentDateTime, reason } = appointmentData;

    try {
      const response = await axios.post("/api/appointments/create", {
        doctorId: appointmentData.doctorId, // Send doctorId
        appointmentDateTime,
        reason,
        doctorName: appointmentData.doctorName,
        amount: appointmentData.amount,
      });
      setFormStatus({ success: true, error: "" });
      alert("Appointment created successfully!");
      console.log("Created Appointment:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
      setFormStatus({ success: false, error: "Failed to create appointment. Please try again." });
    }
  };

  return (
    <div className="form-container">
      <h1>📅 Book an Appointment</h1>
      <p className="subtitle">Schedule your appointment with {doctorName} easily.</p>

      <form onSubmit={handleSubmit} className="appointment-form">
        <input type="hidden" name="doctorId" value={appointmentData.doctorId} /> {/* Hidden input for doctorId */}
        
        <div className="form-group">
          <label htmlFor="doctorName">Doctor Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={appointmentData.doctorName}
            readOnly
            className="form-input read-only"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Consultation Fee:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={`Php ${appointmentData.amount}`}
            readOnly
            className="form-input read-only"
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDateTime">Appointment Date & Time:</label>
          <input
            type="datetime-local"
            id="appointmentDateTime"
            name="appointmentDateTime"
            value={appointmentData.appointmentDateTime}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason for Appointment:</label>
          <textarea
            id="reason"
            name="reason"
            value={appointmentData.reason}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Enter the reason for your appointment..."
          />
        </div>

        {formStatus.error && <p className="error-message">{formStatus.error}</p>}
        {formStatus.success && <p className="success-message">Appointment created successfully!</p>}

        <button type="submit" className="submit-button">Confirm Appointment</button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #333333;
          margin-bottom: 10px;
        }

        .subtitle {
          text-align: center;
          color: #666666;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .appointment-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          display: inline-block;
          color: #333333;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
          outline: none;
        }

        .form-input.read-only {
          background-color: #f9f9f9;
          color: #555555;
          font-weight: 600;
          border: none;
        }

        .error-message {
          color: #d9534f;
          font-size: 13px;
          margin-top: -10px;
          margin-bottom: 10px;
        }

        .success-message {
          color: #28a745;
          font-size: 13px;
          margin-top: -10px;
          margin-bottom: 10px;
        }

        .submit-button {
          padding: 12px 20px;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          background-color: #007bff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #0056b3;
        }

        .submit-button:active {
          background-color: #004085;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 15px;
          }

          h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default AppointmentForm;
