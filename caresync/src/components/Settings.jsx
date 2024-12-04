import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [settings, setSettings] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    notifications: false,
    timeZone: "PST",
  });
  const [medicalHistory, setMedicalHistory] = useState({
    conditions: [],
    otherCondition: "",
    symptoms: [],
    otherSymptom: "",
    takingMedication: false,
    medicationsList: "",
    medicationAllergies: false,
    allergiesList: "",
    tobaccoUse: false,
    tobaccoDetails: "",
    drugUse: false,
    drugDetails: "",
    alcoholConsumption: "",
  });
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDeleteButtonHovered, setIsDeleteButtonHovered] = useState(false);
  const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage.");

        const response = await axios.get(`/api/users/me`, {
          headers: { userId },
        });
        const medicalResponse = await axios.get(
          `/api/medical-history/user/${userId}`
        );

        setSettings({
          ...response.data,
          notifications: false,
          timeZone: "PST",
        });
        setMedicalHistoryList(medicalResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory({ ...medicalHistory, [name]: value });
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`/api/users/${userId}`, {
        name: settings.name,
        email: settings.email,
        phoneNumber: settings.phoneNumber,
      });

      alert("Settings saved successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    }
  };

  const handleAddMedicalHistory = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post(`/api/medical-history/user/${userId}`, medicalHistory);
      alert("Medical history added successfully!");
      const updatedMedicalHistoryList = await axios.get(
        `/api/medical-history/user/${userId}`
      );
      setMedicalHistoryList(updatedMedicalHistoryList.data);
      setMedicalHistory({
        conditions: [],
        otherCondition: "",
        symptoms: [],
        otherSymptom: "",
        takingMedication: false,
        medicationsList: "",
        medicationAllergies: false,
        allergiesList: "",
        tobaccoUse: false,
        tobaccoDetails: "",
        drugUse: false,
        drugDetails: "",
        alcoholConsumption: "",
      });
    } catch (error) {
      console.error("Error adding medical history:", error);
      alert("Failed to add medical history.");
    }
  };

  const handleDeleteMedicalHistory = async (id) => {
    try {
      await axios.delete(`/api/medical-history/${id}`);
      alert("Medical history deleted successfully!");
      const userId = localStorage.getItem("userId");
      const updatedMedicalHistoryList = await axios.get(
        `/api/medical-history/user/${userId}`
      );
      setMedicalHistoryList(updatedMedicalHistoryList.data);
    } catch (error) {
      console.error("Error deleting medical history:", error);
      alert("Failed to delete medical history.");
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Account Settings</h1>
        <button onClick={toggleEditMode} style={styles.editButton}>
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      <div style={styles.contentRow}>
        <div style={styles.card}>
          <div style={styles.formContainer}>
            <h2>Personal Information</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleInputChange}
                style={styles.input}
                disabled={!editMode}
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
                disabled={!editMode}
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
                disabled={!editMode}
              />
            </div>
            {editMode && (
              <button onClick={handleSave} style={styles.saveButton}>
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div style={styles.historyContainer}>
          <h2 style={styles.header}>Medical History</h2>
          {medicalHistoryList.map((record) => (
            <div key={record.id} style={styles.historyCard}>
              <p><strong>Conditions:</strong> {record.conditions.join(", ")}</p>
              <p><strong>Other Condition:</strong> {record.otherCondition}</p>
              <p><strong>Symptoms:</strong> {record.symptoms.join(", ")}</p>
              <p><strong>Other Symptom:</strong> {record.otherSymptom}</p>
              <p><strong>Alcohol Consumption:</strong> {record.alcoholConsumption}</p>
              <button
                onClick={() => handleDeleteMedicalHistory(record.id)}
                style={{
                  ...styles.deleteButton,
                  ...(isDeleteButtonHovered ? styles.deleteButtonHover : {}),
                }}
                onMouseEnter={() => setIsDeleteButtonHovered(true)}
                onMouseLeave={() => setIsDeleteButtonHovered(false)}
              >
                Delete
              </button>
            </div>
          ))}
          <form onSubmit={(e) => { e.preventDefault(); handleAddMedicalHistory(); }}>
            <h3>Add Medical History</h3>
            <input
              type="text"
              name="otherCondition"
              placeholder="Other Condition"
              value={medicalHistory.otherCondition}
              onChange={handleMedicalHistoryChange}
              style={styles.input}
            />
            <input
              type="text"
              name="alcoholConsumption"
              placeholder="Alcohol Consumption"
              value={medicalHistory.alcoholConsumption}
              onChange={handleMedicalHistoryChange}
              style={styles.input}
            />
            <button
              type="submit"
              style={{
                ...styles.addButton,
                ...(isAddButtonHovered ? styles.addButtonHover : {}),
              }}
              onMouseEnter={() => setIsAddButtonHovered(true)}
              onMouseLeave={() => setIsAddButtonHovered(false)}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  editButton: {
    marginLeft: "20px",
    backgroundColor: "#e67e22",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  container: {
    padding: "40px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  },
  header: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  contentRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    width: "100%",
    maxWidth: "1100px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    width: "48%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#34495e",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #bdc3c7",
  },
  saveButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
  },
  historyContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    width: "48%",
  },
  historyCard: {
    backgroundColor: "#ecf0f1",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    display: "block",
  },
  deleteButtonHover: {
    backgroundColor: "#c0392b",
  },
  addButton: {
    backgroundColor: "#2ecc71",
    color: "#fff",
    padding: "10px 15px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    display: "block",
  },
  addButtonHover: {
    backgroundColor: "#27ae60",
  },
};

export default Settings;
