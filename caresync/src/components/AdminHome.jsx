import React from 'react';
import { Link } from 'react-router-dom';

function AdminHome() {
    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#007bff', marginBottom: '20px', marginTop: '-70px' }}>Welcome to Admin Dashboard</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '40px' }}>
                Manage users, appointments, departments, and reports efficiently.
            </p>
            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px', marginTop: '-90px'
                }}
            >
                <Link
                    to="manage-users"
                    style={{
                        padding: '20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        transition: 'transform 0.3s, background-color 0.3s',
                        textAlign: 'center',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Manage Users
                </Link>

                <Link
                    to="manage-departments"
                    style={{
                        padding: '20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        transition: 'transform 0.3s, background-color 0.3s',
                        textAlign: 'center',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Manage Departments
                </Link>

                <Link
                    to="manage-doctors"
                    style={{
                        padding: '20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '10px',
                        transition: 'transform 0.3s, background-color 0.3s',
                        textAlign: 'center',
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    Manage Doctors
                </Link>
            </section>
        </div>
    );
}

export default AdminHome;
