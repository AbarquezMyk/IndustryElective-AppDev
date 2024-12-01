import React, { useState } from 'react';

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
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Here you would typically make an API call
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

      <div className="form-group inline-fields">
        <div className="inline-field">
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

        <div className="inline-field">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
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
          {['Yes', 'No'].map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                name="takingMedication"
                value={answer}
                checked={formData.takingMedication === answer}
                onChange={handleInputChange}
              />
              {answer}
            </label>
          ))}
        </div>
        {formData.takingMedication === 'Yes' && (
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
          {['Yes', 'No', 'Not sure'].map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                name="medicationAllergies"
                value={answer}
                checked={formData.medicationAllergies === answer}
                onChange={handleInputChange}
              />
              {answer}
            </label>
          ))}
        </div>
        {formData.medicationAllergies === 'Yes' && (
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
          {['Yes', 'No'].map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                name="tobaccoUse"
                value={answer}
                checked={formData.tobaccoUse === answer}
                onChange={handleInputChange}
              />
              {answer}
            </label>
          ))}
        </div>
        {formData.tobaccoUse === 'Yes' && (
          <div className="form-group">
            <label>What kind of tobacco products? How long have you used/been using them?</label>
            <textarea
              name="tobaccoDetails"
              value={formData.tobaccoDetails}
              onChange={handleInputChange}
              placeholder="Provide details"
            />
          </div>
        )}
      </fieldset>

      <fieldset className="form-fieldset">
        <legend>Do you use any kind of illegal drugs or have you ever used them?</legend>
        <div className="radio-group">
          {['Yes', 'No'].map((answer) => (
            <label key={answer}>
              <input
                type="radio"
                name="drugUse"
                value={answer}
                checked={formData.drugUse === answer}
                onChange={handleInputChange}
              />
              {answer}
            </label>
          ))}
        </div>
        {formData.drugUse === 'Yes' && (
          <div className="form-group">
            <label>What kind of drugs? How long have you used/been using them?</label>
            <textarea
              name="drugDetails"
              value={formData.drugDetails}
              onChange={handleInputChange}
              placeholder="Provide details"
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

      <style jsx>{`
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
