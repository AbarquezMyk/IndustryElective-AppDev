import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MedicalHistoryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    conditions: [],
    otherCondition: '',
    symptoms: [],
    otherSymptom: '',
    takingMedication: '',
    medicationsList: '',
    medicationAllergies: '',
    allergiesList: '',
    tobaccoUse: '',
    tobaccoDetails: '',
    drugUse: '',
    drugDetails: '',
    alcoholConsumption: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      const response = await fetch(`http://localhost:8080/api/users/${userId}/public-info`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prevState) => ({
          ...prevState,
          fullName: data.name || '',
          contactNumber: data.phoneNumber || '',
          email: data.email || '',
        }));
      } else {
        console.error(`Failed to fetch user data. Status: ${response.status}`);
        const errorData = await response.json();
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState[name], value]
          : prevState[name].filter((item) => item !== value),
      }));
    } else if (type === 'radio') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value === 'Yes' ? true : value === 'No' ? false : value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedFormData = {
      ...formData,
      conditions: formData.conditions.filter((condition) => condition !== ''),
      symptoms: formData.symptoms.filter((symptom) => symptom !== ''),
    };

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      const response = await fetch(`http://localhost:8080/api/medical-history/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (response.ok) {
        const savedData = await response.json();
        console.log('Medical history saved successfully:', savedData);
        alert('Your medical history has been saved successfully!');
        navigate('/dashboard'); // Redirect to /dashboard
      } else {
        const errorData = await response.json();
        console.error('Failed to save medical history. Error:', errorData);
        alert('Failed to save your medical history. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while saving medical history:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="medical-history-form">
      <h2>Medical History Form</h2>

      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
          placeholder="Enter your age"
        />
      </div>

      <div className="form-group">
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Contact Number:</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          required
          placeholder="Enter your contact number"
        />
      </div>

      <div className="form-group">
        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <fieldset className="form-fieldset">
        <legend>Check the conditions that apply to you:</legend>
        <div className="checkbox-group">
          {['Asthma', 'Cardiac disease', 'Hypertension', 'Epilepsy', 'Cancer', 'Diabetes', 'Psychiatric disorder'].map(
            (condition) => (
              <label key={condition}>
                <input
                  type="checkbox"
                  name="conditions"
                  value={condition}
                  checked={formData.conditions.includes(condition)}
                  onChange={handleInputChange}
                />
                {condition}
              </label>
            )
          )}
        </div>
        <label>
          Other:
          <input
            type="text"
            name="otherCondition"
            value={formData.otherCondition}
            onChange={handleInputChange}
            placeholder="Specify if other"
          />
        </label>
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Check the symptoms that you're currently experiencing:</legend>
        <div className="checkbox-group">
          {[
            'Chest pain',
            'Hematological',
            'Gastrointestinal',
            'Musculoskeletal',
            'Respiratory',
            'Lymphatic',
            'Genitourinary',
            'Cardiac disease',
            'Neurological',
            'Weight gain',
            'Cardiovascular',
            'Psychiatric',
            'Weight loss',
          ].map((symptom) => (
            <label key={symptom}>
              <input
                type="checkbox"
                name="symptoms"
                value={symptom}
                checked={formData.symptoms.includes(symptom)}
                onChange={handleInputChange}
              />
              {symptom}
            </label>
          ))}
        </div>
        <label>
          Other:
          <input
            type="text"
            name="otherSymptom"
            value={formData.otherSymptom}
            onChange={handleInputChange}
            placeholder="Specify if other"
          />
        </label>
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Are you currently taking any medication?</legend>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="takingMedication"
              value="Yes"
              checked={formData.takingMedication === true}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="takingMedication"
              value="No"
              checked={formData.takingMedication === false}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
        {formData.takingMedication && (
          <div className="form-group">
            <label>Please list them:</label>
            <textarea
              name="medicationsList"
              value={formData.medicationsList}
              onChange={handleInputChange}
              placeholder="List your medications here"
            />
          </div>
        )}
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Do you have any medication allergies?</legend>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="medicationAllergies"
              value="Yes"
              checked={formData.medicationAllergies === true}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="medicationAllergies"
              value="No"
              checked={formData.medicationAllergies === false}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
        {formData.medicationAllergies && (
          <div className="form-group">
            <label>Please list them:</label>
            <textarea
              name="allergiesList"
              value={formData.allergiesList}
              onChange={handleInputChange}
              placeholder="List your medication allergies"
            />
          </div>
        )}
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Do you use any kind of tobacco or have you ever used them?</legend>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="tobaccoUse"
              value="Yes"
              checked={formData.tobaccoUse === true}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="tobaccoUse"
              value="No"
              checked={formData.tobaccoUse === false}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
        {formData.tobaccoUse === true && (
          <div className="form-group">
            <label htmlFor="tobaccoDetails">
              What kind of tobacco products? How long have you used/been using them?
            </label>
            <textarea
              id="tobaccoDetails"
              name="tobaccoDetails"
              value={formData.tobaccoDetails}
              onChange={handleInputChange}
              placeholder="Provide details"
              rows="4"
              style={{ resize: 'vertical' }}
            />
          </div>
        )}
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Do you use any kind of illegal drugs or have you ever used them?</legend>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="drugUse"
              value="Yes"
              checked={formData.drugUse === true}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="drugUse"
              value="No"
              checked={formData.drugUse === false}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
        {formData.drugUse === true && (
          <div className="form-group">
            <label htmlFor="drugDetails">
              What kind of drugs? How long have you used/been using them?
            </label>
            <textarea
              id="drugDetails"
              name="drugDetails"
              value={formData.drugDetails}
              onChange={handleInputChange}
              placeholder="Provide details"
              rows="4"
              style={{ resize: 'vertical' }}
            />
          </div>
        )}
      </fieldset>



      <fieldset className="form-fieldset">
        <legend>How often do you consume alcohol?</legend>
        <div className="radio-group">
          {['Daily', 'Weekly', 'Monthly', 'Occasionally', 'Never'].map((frequency) => (
            <label key={frequency}>
              <input
                type="radio"
                name="alcoholConsumption"
                value={frequency}
                checked={formData.alcoholConsumption === frequency}
                onChange={handleInputChange}
              />
              {frequency}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="submit-btn">Submit</button>

      <style>{`
        .medical-history-form {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #4CAF50;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group.inline-fields {
          display: flex;
          gap: 15px;
        }

        .inline-field {
          flex: 1;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        input[type="text"], input[type="number"], input[type="email"], input[type="tel"], select, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        input[type="checkbox"], input[type="radio"] {
          margin-right: 8px;
        }

        .form-fieldset {
          margin-bottom: 20px;
        }

        .form-fieldset legend {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .checkbox-group label, .radio-group label {
          width: calc(33% - 6px);
          margin-bottom: 10px;
        }

        .radio-group {
          display: flex;
          gap: 15px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }
      `}</style>
    </form>
  );
};

export default MedicalHistoryForm;
