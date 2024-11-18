import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DoctorDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { doctor } = location.state || {};

    if (!doctor) {
        return <h2>No doctor details available.</h2>;
    }

    
    const qualifications = doctor.qualifications || [];
    const feedbacks = doctor.feedbacks || [];

    return (
        <div style={{ padding: '20px' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: '40px',
                    backgroundColor: '#007bff',  
                    color: 'white',
                    border: 'none',
                    padding: '12px 30px', 
                    fontSize: '18px',  
                    borderRadius: '8px',  
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease', 
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')} 
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')} 
            >
                Back
            </button>
            <h1>{doctor.name}</h1>
            <img src={doctor.image} alt={doctor.name} style={{ width: '300px', borderRadius: '10px' }} />
            <h2>Specialty: {doctor.specialty}</h2>

            <h3>Qualifications:</h3>
            {qualifications.length > 0 ? (
                qualifications.map((qual, index) => (
                    <div key={index}>
                        <h4>{qual.title}</h4>
                        <p>{qual.details}</p>
                    </div>
                ))
            ) : (
                <p>No qualifications available.</p>
            )}

            <h3>Patient Feedback:</h3>
            {feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h4>{feedback.patientName} - {feedback.rating}</h4>
                        <p><strong>Date:</strong> {feedback.date}</p>
                        <p><strong>Comment:</strong> {feedback.comment}</p>
                    </div>
                ))
            ) : (
                <p>No feedback available.</p>
            )}
        </div>
    );
};

export default DoctorDetails;
