import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentHistoryForm = () => {
    const [formData, setFormData] = useState({
        historyDate: '',
        reasons: '',
        results: '',
        status: 'Pending',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:8082/api/appointment-history', formData); // FETCH DATA FROM FRONTEND TO BACKEND 
            console.log('Data saved:', response.data); 
            alert('Appointment saved successfully!'); // hays huhuhuhuh di nako kasabot You can show a success message or handle it differently
            navigate('/history'); // Redirect to the AppointmentHistory page mohilak nakoo 
        } catch (error) {
            console.error('Error saving appointment:', error.response ? error.response.data : error.message);
            alert('Failed to save appointment. Please try again.'); // More context on the error can be added diri huhu
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Appointment History Form</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="historyDate" style={styles.label}>History Date:</label>
                    <input
                        type="date"
                        id="historyDate"
                        name="historyDate"
                        value={formData.historyDate}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="reasons" style={styles.label}>Reasons:</label>
                    <input
                        type="text"
                        id="reasons"
                        name="reasons"
                        value={formData.reasons}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="results" style={styles.label}>Results:</label>
                    <input
                        type="text"
                        id="results"
                        name="results"
                        value={formData.results}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="status" style={styles.label}>Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        style={styles.select}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial',
        padding: '20px',
        backgroundColor: '#F8F9FA',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    title: {
        fontSize: '24px',
        color: '#023350',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '16px',
        color: '#4F4F4F',
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    select: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #023350',
        backgroundColor: '#023350',
        color: '#FFFFFF',
        cursor: 'pointer',
    },
};

export default AppointmentHistoryForm;