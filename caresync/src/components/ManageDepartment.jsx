import React, { useState, useEffect } from 'react';

function ManageDepartment() {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({ departmentName: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    // Fetch departments from the backend
    useEffect(() => {
        fetch('/api/departments')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch departments');
                }
                return response.json();
            })
            .then((data) => setDepartments(data))
            .catch((error) => console.error('Error fetching departments:', error));
    }, []);

    // Handle input change for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Add a new department
    const addDepartment = () => {
        if (!formData.departmentName || !formData.description) {
            alert('Please fill out all fields.');
            return;
        }

        fetch('/api/departments/add', { // Correct endpoint for adding a department
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add department');
                }
                return response.json();
            })
            .then((newDepartment) => {
                setDepartments((prevDepartments) => [...prevDepartments, newDepartment]);
                setFormData({ departmentName: '', description: '' });
            })
            .catch((error) => console.error('Error adding department:', error));
    };

    // Edit an existing department
    const editDepartment = (id) => {
        const department = departments.find((dept) => dept.departmentId === id);
        setFormData({ departmentName: department.departmentName, description: department.description });
        setEditingId(id);
    };

    // Update an existing department
    const updateDepartment = () => {
        if (!formData.departmentName || !formData.description) {
            alert('Please fill out all fields.');
            return;
        }

        fetch(`/api/departments/update/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update department');
                }
                return response.json();
            })
            .then((updatedDepartment) => {
                setDepartments((prevDepartments) =>
                    prevDepartments.map((dept) =>
                        dept.departmentId === editingId ? updatedDepartment : dept
                    )
                );
                setFormData({ departmentName: '', description: '' });
                setEditingId(null);
            })
            .catch((error) => console.error('Error updating department:', error));
    };

    // Delete a department
    const deleteDepartment = (id) => {
        fetch(`/api/departments/${id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete department');
                }
                setDepartments((prevDepartments) =>
                    prevDepartments.filter((dept) => dept.departmentId !== id)
                );
            })
            .catch((error) => console.error('Error deleting department:', error));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#007bff', marginBottom: '20px', marginTop: '-90px' }}>Manage Departments</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
                View, add, edit, or delete departments.
            </p>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="departmentName"
                    placeholder="Department Name"
                    value={formData.departmentName}
                    onChange={handleInputChange}
                    style={{ padding: '10px', marginRight: '10px', width: '200px' }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{ padding: '10px', marginRight: '10px', width: '200px' }}
                />
                {editingId ? (
                    <button
                        onClick={updateDepartment}
                        style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}
                    >
                        Update
                    </button>
                ) : (
                    <button
                        onClick={addDepartment}
                        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}
                    >
                        Add
                    </button>
                )}
            </div>

            <table style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Name</th>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Description</th>
                        <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.departmentId}>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                {department.departmentId}
                            </td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                {department.departmentName}
                            </td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                {department.description}
                            </td>
                            <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                                <button
                                    onClick={() => editDepartment(department.departmentId)}
                                    style={{
                                        marginRight: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#ffc107',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteDepartment(department.departmentId)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: '#dc3545',
                                        color: '#fff',
                                        border: 'none',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageDepartment;
