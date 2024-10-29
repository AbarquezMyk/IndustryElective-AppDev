import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from './img/Logo1.png';

const PatientProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    birthdate: '',
    phone: '',
    email: '',
    address: '',
    allergies: '',
    medicalHistory: '',
    currentMedicals: '',
    immunizationRecords: '',
    familyMedicalHistory: '',
    nextOfKin: '',
    contactInformation: '',
    secondaryContact: '',
    secondaryContactInformation: '',
    specialInstructions: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get('/api/patient/profile')
      .then(response => {
        setFormData(response.data);
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      })
      .catch(error => console.error("Error loading profile data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData, profileImage };

    axios.post('/api/patient/profile', dataToSubmit)
      .then(response => {
        console.log("Profile saved successfully:", response.data);
        alert("Profile saved successfully!");
      })
      .catch(error => {
        console.error("Error saving profile data:", error);
        alert("Failed to save profile. Try again.");
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.title}>CareSync</span>
      </div>
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

        <label>
          First Name*:
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
        </label>

        <label>
          Last Name*:
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
        </label>

        <label>
          Sex:
          <select name="sex" value={formData.sex} onChange={handleChange} style={styles.input}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Birthdate:
          <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Allergies:
          <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Medical History:
          <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} style={styles.textarea} />
        </label>

        <label>
          Current Medicals:
          <input type="text" name="currentMedicals" value={formData.currentMedicals} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Immunization Records:
          <textarea name="immunizationRecords" value={formData.immunizationRecords} onChange={handleChange} style={styles.textarea} />
        </label>

        <label>
          Family Medical History:
          <textarea name="familyMedicalHistory" value={formData.familyMedicalHistory} onChange={handleChange} style={styles.textarea} />
        </label>

        <label>
          Next of Kin:
          <input type="text" name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Contact Information (Phone Number):
          <input type="tel" name="contactInformation" value={formData.contactInformation} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Secondary Contact:
          <input type="text" name="secondaryContact" value={formData.secondaryContact} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Secondary Contact Information:
          <input type="tel" name="secondaryContactInformation" value={formData.secondaryContactInformation} onChange={handleChange} style={styles.input} />
        </label>

        <label>
          Special Instructions:
          <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} style={styles.textarea} />
        </label>

        <button type="submit" style={styles.submitButton}>Save Profile</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: '10px',
    fontFamily: 'Arial',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: '20px'
  },
  logo: {
    width: '70px',
    height: '70px',
    marginRight: '10px'
  },
  title: {
    color: '#023350',
    letterSpacing: '2px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '20px'
  },
  profilePictureSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px'
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px'
  },
  placeholderImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  fileInput: {
    marginBottom: '10px'
  },
  deleteButton: {
    backgroundColor: '#FF6F61',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer'
  },
  input: {
    marginBottom: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '90%', // Make it smaller
    maxWidth: '300px' // Set max width for smaller inputs
  },
  textarea: {
    marginBottom: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    height: '60px',
    width: '90%', // Adjust textarea width
    maxWidth: '300px'
  },
  submitButton: {
    backgroundColor: '#FF6F61',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default PatientProfileForm;