import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    username: "Jane Smith",
    email: "janesmith@example.com",
    notifications: false,
    timeZone: "PST",
    phoneNumber: "", // Added phone number field
    language: "English", // Added preferred language field
    emergencyContact: "", // Added emergency contact field
    medicalPreferences: "", // Added medical preferences field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleCheckboxChange = () => {
    setSettings({
      ...settings,
      notifications: !settings.notifications,
    });
  };

  const handleSave = () => {
    alert("Settings have been saved!");
    // Implement save functionality like API request here
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Account Settings</h1>
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={settings.username}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={settings.phoneNumber}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="e.g. +1234567890"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Preferred Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Emergency Contact</label>
          <input
            type="text"
            name="emergencyContact"
            value={settings.emergencyContact}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Name, Relationship, Phone"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Medical Preferences</label>
          <input
            type="text"
            name="medicalPreferences"
            value={settings.medicalPreferences}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="e.g. Allergies, Conditions"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Notifications</label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={handleCheckboxChange}
            style={styles.checkbox}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Time Zone</label>
          <select
            name="timeZone"
            value={settings.timeZone}
            onChange={handleInputChange}
            style={styles.select}
          >
            <option value="UTC">UTC</option>
            <option value="GMT">GMT</option>
            <option value="PST">PST</option>
            <option value="EST">EST</option>
          </select>
        </div>
        <button onClick={handleSave} style={styles.saveButton}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",  
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", 
  },
  formGroup: {
    marginBottom: "15px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
  },
  label: {
    fontSize: "1rem",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  select: {
    width: "100%",
    padding: "8px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  saveButton: {
    backgroundColor: "#3498DB",
    color: "#FFF",
    padding: "12px 18px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "15px",
    transition: "background-color 0.3s",
    width: "100%",
    maxWidth: "200px",
  },
};

export default Settings;
