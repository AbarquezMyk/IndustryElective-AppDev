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
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Departments</h1>
      {loading ? (
        <p>Loading departments...</p>
      ) : (
        departments.map((department) => (
          <button
            key={department.departmentId}
            onClick={() => handleDepartmentClick(department.departmentId)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <strong>{department.departmentName}</strong>
            <p>{department.description}</p>
          </button>
        ))
      )}
    </div>
  );
};

export default DepartmentList;
