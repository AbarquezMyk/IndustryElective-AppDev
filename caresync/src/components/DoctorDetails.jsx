import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const { doctorId } = useParams(); // Get doctorId from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To navigate to AppointmentForm

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (loading || !doctor) {
    return <p>Loading doctor details...</p>;
  }

  const handleMakeAppointment = () => {
    // Pass doctor ID, name, and amount to the appointment form
    navigate("/history-form", {
      state: {
        doctorId: doctorId, // Pass the doctor ID
        doctorName: doctor.name,
        doctorAmount: doctor.amount,
      },
    });
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h1>Doctor Details</h1>
      {doctor.profilePicture && (
        <div>
          <img
            src={`http://localhost:8080/uploads/${doctor.profilePicture}`}
            alt={`${doctor.name}'s profile`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>
      )}
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phoneNumber}</p>
      <p><strong>Amount:</strong> Php {doctor.amount.toFixed(2)}</p>
      <button
        onClick={handleMakeAppointment}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Make an Appointment
      </button>
    </div>
  );
};

export default DoctorDetails;
