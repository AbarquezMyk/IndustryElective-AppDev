import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './img/logo.png';

const PatientProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    sex: '',
    phone: '',
    email: '',
    address: '',
    allergies: [],
    otherAllergy: '',
    immunizationRecords: [],
    medicalHistory: '',
    currentMedications: '',
    familyMedicalHistory: '',
    nextOfKin: '',
    contactInformation: '',
    secondaryContact: '',
    secondaryContactInformation: '',
    specialInstructions: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/patients/all');
        setFormData(prevData => ({
          ...prevData,
          ...response.data,
        }));
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
          ? [...prevData[name], value]
          : prevData[name].filter(item => item !== value),
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setImageFile(null);
    fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'phone', 'email', 'address'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
        return;
      }
    }

    const dataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        dataToSubmit.append(key, JSON.stringify(formData[key]));
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    if (imageFile) {
      dataToSubmit.append('profileImage', imageFile);
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/patients/create', dataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Profile saved successfully:", response.data);
      alert("Profile saved successfully!");

      navigate('/home');
    } catch (error) {
      if (error.response) {
        console.error("Server response error:", error.response.data);
        alert(`Failed to save profile. Error: ${error.response.data.message || "Unknown error"}`);
      } else {
        console.error("Error saving profile data:", error.message);
        alert(`Failed to save profile. Error: ${error.message}`);    
      }
    } finally {
      setLoading(false);
    }
  };

  const allergyOptions = [
    "Peanuts", "Tree Nuts", "Milk", "Eggs", "Wheat", "Soy",
    "Fish", "Shellfish", "Sesame", "Corn", "Mustard", "Celery",
    "Lupin", "Gluten", "Fruits", "Vegetables", "Pollen", "Dust Mites",
    "Animal Dander", "Mold Spores", "Latex", "Insect Stings",
    "Medications", "Cosmetics and Skincare Products", "Nickel", "Others"
  ];

  const immunizationOptions = [
    "BCG - Tuberculosis", "DTP - Diphtheria, Tetanus, Pertussis",
    "Hepatitis B", "OPV - Poliomyelitis", "Hib - Invasive Hib disease",
    "Measles, Mumps, Rubella (MMR)", "Pneumococcal Conjugate Vaccine (PCV)",
    "Rotavirus Vaccine", "Varicella (Chickenpox)", "Td - Tetanus, Diphtheria",
    "Influenza Vaccine", "COVID - 19 Vaccine"
  ];

  return (
    <div>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={{ marginLeft: '-1600px', marginTop: "-65px", width: '15%' }} />
      </div>

      <div style={styles.profileSetupText}>P R O F I L E  S E T - U P</div>
      <div style={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.profilePictureSection}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" style={styles.profileImage} />
              ) : (
                <div style={styles.placeholderImage}>Profile Picture</div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                ref={fileInputRef}
                style={styles.fileInput}
              />
              {profileImage && (
                <button type="button" onClick={handleDeleteImage} style={styles.deleteButton}>
                  Delete Image
                </button>
              )}
            </div>

            {/* Form Fields */}
            <label style={styles.label}>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Date of Birth</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Sex</label>
          <select name="sex" value={formData.sex} onChange={handleChange} style={styles.Sexinput}>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

            <label style={styles.label}>Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Allergies</label>
            {allergyOptions.map(option => (
              <div key={option}>
                <input 
                  type="checkbox" 
                  name="allergies" 
                  value={option} 
                  checked={formData.allergies.includes(option)} 
                  onChange={handleChange} 
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{option}</span>
              </div>
            ))}
            
            <label style={styles.label}>Other Allergy</label>
            <input type="text" name="otherAllergy" value={formData.otherAllergy} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Immunization Records</label>
            {immunizationOptions.map(option => (
              <div key={option}>
                <input 
                  type="checkbox" 
                  name="immunizationRecords" 
                  value={option} 
                  checked={formData.immunizationRecords.includes(option)} 
                  onChange={handleChange} 
                  style={styles.checkbox}
                />
                <span style={styles.checkboxLabel}>{option}</span>
              </div>
            ))}

            <label style={styles.label}>Medical History</label>
            <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} style={styles.textarea} />

            <label style={styles.label}>Current Medications</label>
            <textarea name="currentMedications" value={formData.currentMedications} onChange={handleChange} style={styles.textarea} />

            <label style={styles.label}>Family Medical History</label>
            <textarea name="familyMedicalHistory" value={formData.familyMedicalHistory} onChange={handleChange} style={styles.textarea} />

            <label style={styles.label}>Next of Kin</label>
            <input type="text" name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Contact Information</label>
            <input type="text" name="contactInformation" value={formData.contactInformation} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Secondary Contact</label>
            <input type="text" name="secondaryContact" value={formData.secondaryContact} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Secondary Contact Information</label>
            <input type="text" name="secondaryContactInformation" value={formData.secondaryContactInformation} onChange={handleChange} style={styles.input} />

            <label style={styles.label}>Special Instructions</label>
            <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} style={styles.textarea} />

            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  option: {
    color: '#023350'
  },
  profileSetupText: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '20px 0',
    marginTop: '-50px',
    marginBottom: '20px',
    fontWeight: '500',
    color: '#023350',
    letterSpacing: '5px'
  },
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  profilePictureSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  Sexinput: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    width: '83%',
    fontSize: '1rem',
    color: '#023350'
  },
  placeholderImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  label: {
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    color: '#023350'
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    width: '80%',
    fontSize: '1rem',
    color: '#023350'
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    width: '100%',
    fontSize: '1rem',
    minHeight: '100px',
  },
  checkbox: {
    marginRight: '10px',
  },
  checkboxLabel: {
    marginRight: '15px',
  },
  submitButton: {
    backgroundColor: '#023350',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100px',
    display: 'block',
    margin: '20px auto',
    },

};

export default PatientProfileForm;