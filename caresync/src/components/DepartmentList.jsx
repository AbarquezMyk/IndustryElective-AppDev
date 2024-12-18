import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/departments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        return response.json();
      })
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDepartmentClick = (departmentId) => {
    navigate(`/doctors/${departmentId}`);
  };

  if (error) {
    return <div style={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div style={styles.main}>
      <h1 style={styles.header}>OUR DEPARTMENTS</h1>
      {loading ? (
        <p style={styles.loadingText}>Loading departments...</p>
      ) : (
        <div style={styles.grid}>
          {departments.map((department) => (
            <div key={department.departmentId} style={styles.card}>
              <div style={styles.icon}>{department.icon}</div> {/* Icon here */}
              <strong style={styles.departmentName}>{department.departmentName}</strong>
              <p style={styles.departmentDescription}>{department.description}</p>
              <button
                onClick={() => handleDepartmentClick(department.departmentId)}
                style={styles.findDoctorButton}
              >
                Find a Doctor
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  main: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    color: "#E2E8F0", 
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1A1A2E",
    marginBottom: "30px",
    textTransform: "uppercase",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#718096", 
  },
  errorText: {
    color: "#F56565", 
    fontSize: "1.5rem",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "40px",
    justifyContent: "center",
    marginTop: "20px",
    '@media (max-width: 768px)': {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: "1fr",
    },
  },
  card: {
    padding: "20px",
    backgroundColor: "#FFF",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "50px",
    color: "#63B3ED",
    marginBottom: "10px",
  },
  departmentName: {
    fontSize: "1.3rem",
    color: "#2B6CB0",
    fontWeight: "bold",
    marginTop: "10px",
  },
  departmentDescription: {
    fontSize: "1rem",
    color: "#2B6CB0",
    marginTop: "10px",
    fontStyle: "italic",
    padding: "0 10px",
    textAlign: "center",
  },
  findDoctorButton: {
    backgroundColor: "#007BFF",
    color: "#FFF",
    fontSize: "1.2rem",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    transition: "background-color 0.3s ease",
    '&:hover': {
      backgroundColor: "#3182CE", // Darker blue on hover
    },
  },
};

export default DepartmentList;
