import React, { useState, useEffect } from 'react';

function ManageDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [doctorForm, setDoctorForm] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        specialization: '', // This will be the departmentId
        amount: '',
        password: '',
        profilePicture: null,
    });
    const [departments, setDepartments] = useState([]); // State for departments
    const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal visibility

    // Fetch doctors and departments from the backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/api/doctors/getAllDoctors');
                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }
                const data = await response.json();
                setDoctors(data);
                setFilteredDoctors(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await fetch('/api/departments');
                if (!response.ok) {
                    throw new Error('Failed to fetch departments');
                }
                const data = await response.json();
                setDepartments(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDoctors();
        fetchDepartments();
    }, []);

    // Handle search
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredDoctors(
            doctors.filter((doctor) =>
                doctor.name.toLowerCase().includes(term)
            )
        );
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorForm({ ...doctorForm, [name]: value });
    };

    // Handle file input for profile picture
    const handleFileChange = (e) => {
        setDoctorForm({ ...doctorForm, profilePicture: e.target.files[0] });
    };

    // Reset the form and editing state
    const resetForm = () => {
        setDoctorForm({
            name: '',
            email: '',
            phoneNumber: '',
            specialization: '',
            amount: '',
            password: '',
            profilePicture: null,
        });
        setEditingDoctor(null);
    };

    // Add or update a doctor
    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append('name', doctorForm.name);
            formData.append('email', doctorForm.email);
            formData.append('phoneNumber', doctorForm.phoneNumber);
            formData.append('specialization', doctorForm.specialization); // Make sure this sends the ID of the department
            formData.append('amount', doctorForm.amount);
            formData.append('password', doctorForm.password);
            
            if (doctorForm.profilePicture) {
                formData.append('file', doctorForm.profilePicture);
            }

            const response = await fetch(
                editingDoctor
                    ? `/api/doctors/${editingDoctor.doctorId}`
                    : '/api/doctors/addDoctor',
                {
                    method: editingDoctor ? 'PUT' : 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(editingDoctor ? 'Failed to update doctor: ' + errorText : 'Failed to add doctor');
            }

            const savedDoctor = await response.json();
            if (editingDoctor) {
                setDoctors(doctors.map((d) => (d.doctorId === savedDoctor.doctorId ? savedDoctor : d)));
                setFilteredDoctors(
                    filteredDoctors.map((d) => (d.doctorId === savedDoctor.doctorId ? savedDoctor : d))
                );
            } else {
                setDoctors([...doctors, savedDoctor]);
                setFilteredDoctors([...filteredDoctors, savedDoctor]);
            }

            resetForm();
            setIsModalOpen(false);
        } catch (err) {
            alert(err.message);
        }
    };

    // Edit a doctor
    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setDoctorForm({
            name: doctor.name,
            email: doctor.email,
            phoneNumber: doctor.phoneNumber,
            specialization: doctor.specialty ? doctor.specialty.departmentId : '', // Reference department ID directly
            amount: doctor.amount,
            password: '', // Keep password empty for security when editing
            profilePicture: null,
        });
        setIsModalOpen(true); // Open the modal for editing
    };

    // Delete a doctor
    const handleDelete = async (doctorId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/doctors/deleteDoctor/${doctorId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete doctor');
            }
            setDoctors(doctors.filter((doctor) => doctor.doctorId !== doctorId));
            setFilteredDoctors(filteredDoctors.filter((doctor) => doctor.doctorId !== doctorId));
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <p>Loading doctors...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#007bff', marginBottom: '20px', textAlign: 'center', marginTop: '-90px' }}>
                Manage Doctors
            </h2>

            {/* Add Doctor Button */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Add Doctor
                </button>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                        padding: '10px',
                        width: '100%',
                        maxWidth: '400px',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                    }}
                />
            </div>

            {/* Doctors Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Profile Picture</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Doctor ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Phone</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Specialization</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <tr key={doctor.doctorId}>
                                <td>
                                    {doctor.profilePicture ? (
                                        <img
                                            src={`/uploads/${doctor.profilePicture}`} // Adjust based on your file hosting
                                            alt="Profile"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                        />
                                    ) : (
                                        'No picture'
                                    )}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{doctor.doctorId}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{doctor.name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{doctor.email}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{doctor.phoneNumber}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                                    {doctor.specialty ? doctor.specialty.departmentName : 'N/A'}
                                </td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                                    <button
                                        onClick={() => handleEdit(doctor)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doctor.doctorId)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: '#dc3545',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                                No doctors found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Adding/Editing Doctor */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '500px' }}>
                        <h3>{editingDoctor ? 'Edit Doctor' : 'Add Doctor'}</h3>
                        <form>
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={doctorForm.name}
                                    onChange={handleInputChange}
                                    style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={doctorForm.email}
                                    onChange={handleInputChange}
                                    style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label>Phone</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={doctorForm.phoneNumber}
                                    onChange={handleInputChange}
                                    style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label>Specialization</label>
                                <select
                                    name="specialization"
                                    value={doctorForm.specialization}
                                    onChange={handleInputChange}
                                    style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                >
                                    <option value="">Select Specialization</option>
                                    {departments.map((department) => (
                                        <option key={department.departmentId} value={department.departmentId}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Amount</label>
                                <input
                                    type="text"
                                    name="amount"
                                    value={doctorForm.amount}
                                    onChange={handleInputChange}
                                    style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={doctorForm.password}
                                    onChange={handleInputChange}
                                    style={{ padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label>Profile Picture</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleSave}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginLeft: '10px',
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageDoctors;