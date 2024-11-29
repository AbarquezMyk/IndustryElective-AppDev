import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DoctorList = () => {
  const { departmentId } = useParams(); // Get departmentId from URL
  const navigate = useNavigate(); // Used for navigation

  const [state, setState] = useState({
    departmentName: "",
    doctors: [],
    loading: true,
    error: null,
  });

  const { departmentName, doctors, loading, error } = state;

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/departments/${departmentId}`);
        if (!response.ok) throw new Error("Failed to fetch department details");
        const data = await response.json();
        setState((prev) => ({ ...prev, departmentName: data.departmentName }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: err.message }));
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/departments/byDepartment/${departmentId}`);
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setState((prev) => ({ ...prev, doctors: data, loading: false }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: err.message, loading: false }));
      }
    };

    fetchDepartmentDetails();
    fetchDoctors();
  }, [departmentId]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}/details`); // Navigate to DoctorDetails
  };

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Doctors in Department {departmentName}</h1>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {doctors.map((doctor) => (
            <li
              key={doctor.doctorId}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              {/* Doctor Profile Picture */}
              <img
                src={doctor.profilePicture ? `http://localhost:8080/uploads/${doctor.profilePicture}` : "https://via.placeholder.com/100"}
                alt={`${doctor.name}'s Profile`}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginRight: "20px",
                }}
              />
              {/* Doctor Details */}
              <div>
                <button
                  onClick={() => handleDoctorClick(doctor.doctorId)}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {doctor.name}
                </button>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p style={{ margin: "0 0 5px 0" }}>
                  <strong>Phone:</strong> {doctor.phoneNumber}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No doctors found in this department.</p>
      )}
    </div>
  );
};

export default DoctorList;
