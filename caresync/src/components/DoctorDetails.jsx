import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newFeedback, setNewFeedback] = useState({ comment: "", rating: 0 }); 
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // Retrieve user's name, fallback to "Anonymous" if not found
  const userName = localStorage.getItem("userName") || "Anonymous"; // Or use your app's logic to get the user name

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
        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleMakeAppointment = () => {
    navigate("/history-form", {
      state: {
        doctorId: doctorId,
        doctorName: doctor.name,
        doctorAmount: doctor.amount,
      },
    });
  };

  const handleAddFeedback = () => {
    const { comment, rating } = newFeedback;
    if (!comment.trim() || rating <= 0) return;

    const newEntry = {
      comment,
      rating,
      dateOfReview: new Date().toISOString().split("T")[0],
      reviewerName: userName, // Ensure the user's name is added
    };

    setFeedbacks([...feedbacks, newEntry]);
    setNewFeedback({ comment: "", rating: 0 });

    fetch(`http://localhost:8080/api/doctors/${doctorId}/feedbacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save feedback");
        }
      })
      .catch((err) => console.error("Failed to save feedback:", err));
  };

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (loading || !doctor) {
    return <p>Loading doctor details...</p>;
  }

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

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "15px", color: "#333" }}>Feedbacks</h2>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div
              key={index}
              style={{
                padding: "10px",
                borderBottom: index < feedbacks.length - 1 ? "1px solid #ddd" : "none",
              }}
            >
              <p style={{ margin: "0", fontStyle: "italic" }}>"{feedback.comment}"</p>
              <p style={{ margin: "5px 0 0", fontWeight: "bold", color: "#555" }}>
                - {feedback.reviewerName}, Rating: {feedback.rating} ⭐
              </p>
              <p style={{ margin: "0", fontSize: "small", color: "#888" }}>
                Date: {feedback.dateOfReview}
              </p>
            </div>
          ))
        ) : (
          <p>No feedbacks available for this doctor.</p>
        )}

        <div style={{ marginTop: "20px" }}>
          <textarea
            value={newFeedback.comment}
            onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
            placeholder="Write your feedback..."
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              resize: "none",
            }}
            rows="4"
          />
          <div style={{ margin: "10px 0" }}>
            <label>
              Rating:{" "}
              <select
                value={newFeedback.rating}
                onChange={(e) => setNewFeedback({ ...newFeedback, rating: parseInt(e.target.value) })}
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <option value="0">Select</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            onClick={handleAddFeedback}
            style={{
              marginTop: "10px",
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
