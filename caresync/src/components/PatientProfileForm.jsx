import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import logo from './img/logo.png';

const PatientProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    sex: '',
    birthdate: '',
    phone: '',
    email: '',
    address: '',
    allergies: [],
    otherAllergy: '',
    medicalHistory: '',
    currentMedicals: '',
    immunizationRecords: [],
    familyMedicalHistory: '',
    nextOfKin: '',
    contactInformation: '',
    secondaryContact: '',
    secondaryContactInformation: '',
    specialInstructions: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "allergies") {
        if (checked) {
          setFormData((prevData) => ({
            ...prevData,
            allergies: [...prevData.allergies, value]
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            allergies: prevData.allergies.filter(allergy => allergy !== value)
          }));
        }
      } else if (name === "immunizationRecords") {
        if (checked) {
          setFormData((prevData) => ({
            ...prevData,
            immunizationRecords: [...prevData.immunizationRecords, value]
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            immunizationRecords: prevData.immunizationRecords.filter(record => record !== value)
          }));
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    dataToSubmit.append('profileImage', imageFile);

    for (const key in formData) {
      dataToSubmit.append(key, formData[key]);
    }

    axios.post('/api/patient/profile', dataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("Profile saved successfully:", response.data);
        alert("Profile saved successfully!");
      })
      .catch(error => {
        console.error("Error saving profile data:", error);
        alert("Failed to save profile. Try again.");
      });
  };

  const allergyOptions = [
    "Peanuts", "Tree Nuts", "Milk", "Eggs", "Wheat", "Soy",
    "Fish", "Shellfish", "Sesame", "Corn", "Mustard", "Celery",
    "Lupin", "Gluten", "Fruits", "Vegetables", "Pollen", "Dust Mites",
    "Animal Dander", "Mold Spores", "Latex", "Insect Stings",
    "Medications", "Cosmetics and Skincare Products", "Nickel", "Others"
  ];

  const immunizationOptions = [
    "BCG - Tuberculosis",
    "DTP - Diphtheria, Tetanus, Pertussis",
    "Hepatitis B",
    "OPV - Poliomyelitis",
    "Hib - Invasive Hib disease",
    "Measles, Mumps, Rubella (MMR)",
    "Pneumococcal Conjugate Vaccine (PCV)",
    "Rotavirus Vaccine",
    "Varicella (Chickenpox)",
    "Td - Tetanus, Diphtheria",
    "Influenza Vaccine"
  ];

  return (
    <div>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      <div style={styles.profileSetupText}>P R O F I L E  S E T - U P</div>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}></form>
      </div>

      <div style={styles.container}>
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

          <div style={styles.nameContainer}>
            <label style={styles.label}>
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
            
            <label style={styles.label}>
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
          </div>

          <div style={styles.sexAndBirthdateContainer}>
            <label style={styles.labelCenter}>
              Sex:
              <select name="sex" value={formData.sex} onChange={handleChange} style={styles.input}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label style={styles.labelCenter}>
              Birthdate:
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} style={styles.input} />
            </label>
          </div>

          <div style={styles.phoneAndEmailContainer}>
            <label style={styles.labelCenter}>
              Phone:
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} />
            </label>

            <label style={styles.labelCenter}>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} style={styles.input} />
            </label>
          </div>

          <label style={styles.labelCenter}>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} />
          </label>

          <div style={styles.labelCenter}>
            <span>Allergies:</span>
            <div style={styles.checkboxContainer}>
              {allergyOptions.map((allergy) => (
                <label key={allergy} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="allergies"
                    value={allergy}
                    checked={formData.allergies.includes(allergy)}
                    onChange={handleChange}
                  />
                  {allergy}
                </label>
              ))}
            </div>
            <label style={styles.label}>
              Other Allergy (if applicable):
              <input
                type="text"
                name="otherAllergy"
                value={formData.otherAllergy}
                onChange={handleChange}
                style={styles.input}
                placeholder="Specify other allergies..."
              />
            </label>
          </div>

          <label style={styles.labelCenter}>
            Medical History:
            <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} style={styles.textarea} />
          </label>

          <label style={styles.labelCenter}>
            Current Medicals:
            <input type="text" name="currentMedicals" value={formData.currentMedicals} onChange={handleChange} style={styles.input} />
          </label>

          <div style={styles.labelCenter}>
            <span>Immunization Records:</span>
            <div style={styles.checkboxContainer}>
              {immunizationOptions.map((record) => (
                <label key={record} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="immunizationRecords"
                    value={record}
                    checked={formData.immunizationRecords.includes(record)}
                    onChange={handleChange}
                  />
                  {record}
                </label>
              ))}
            </div>
          </div>

          <label style={styles.labelCenter}>
            Family Medical History:
            <textarea name="familyMedicalHistory" value={formData.familyMedicalHistory} onChange={handleChange} style={styles.textarea} />
          </label>

          <label style={styles.labelCenter}>
            Next of Kin:
            <input type="text" name="nextOfKin" value={formData.nextOfKin} onChange={handleChange} style={styles.input} />
          </label>

          <label style={styles.labelCenter}>
            Contact Information:
            <input type="tel" name="contactInformation" value={formData.contactInformation} onChange={handleChange} style={styles.input} />
          </label>

          <label style={styles.labelCenter}>
            Secondary Contact:
            <input type="text" name="secondaryContact" value={formData.secondaryContact} onChange={handleChange} style={styles.input} />
          </label>

          <label style={styles.labelCenter}>
            Secondary Contact Information:
            <input type="tel" name="secondaryContactInformation" value={formData.secondaryContactInformation} onChange={handleChange} style={styles.input} />
          </label>

          <label style={styles.labelCenter}>
            Special Instructions:
            <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} style={styles.textarea} />
          </label>

          <button type="submit" style={styles.submitButton}>Save Profile</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    height: '200px',
    marginLeft: '20px',
    marginBottom: '-40px'
  },
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  profileSetupText: {
    textAlign: 'center',
    fontSize: '40px',
    fontWeight: '300',
    letterSpacing: '8px',
    color: '#023350',
    margin: '20px 0',
    marginBottom: '-10px'
  },
  form: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
  },
  labelCenter: {
    display: 'block',
    marginBottom: '15px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    height: '80px',
    marginBottom: '10px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  checkboxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  checkboxLabel: {
    marginRight: '10px',
    fontSize: '14px',
  },
  profilePictureSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
  placeholderImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    display: 'inline-block',
    lineHeight: '150px',
    color: '#666',
    marginBottom: '10px',
  },
  fileInput: {
    display: 'block',
    margin: '10px auto',
  },
  deleteButton: {
    display: 'block',
    margin: '10px auto',
    backgroundColor: '#FF6F61',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#023350',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  }
};

export default PatientProfileForm;