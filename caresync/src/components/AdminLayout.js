import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from './img/logo.png';

function AdminLayout() {
    return (
        <div style={{ fontFamily: 'Manjari, sans-serif', color: '#333' }}>
            <nav
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#fff',
                    marginBottom: '20px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}
                >
                    <Link to="/">
                        <img src={logo} width="180" alt="CareSync Logo" />
                    </Link>
                    <ul
                        style={{
                            listStyle: 'none',
                            display: 'flex',
                            padding: 0,
                            margin: 0,
                            gap: '20px',
                        }}
                    >
                        <li>
                            <Link
                                to="/admin"
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    color: '#333',
                                    transition: 'color 0.3s',
                                }}
                                onMouseOver={(e) => (e.target.style.color = '#007bff')}
                                onMouseOut={(e) => (e.target.style.color = '#333')}
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="manage-users"
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    color: '#333',
                                    transition: 'color 0.3s',
                                }}
                                onMouseOver={(e) => (e.target.style.color = '#007bff')}
                                onMouseOut={(e) => (e.target.style.color = '#333')}
                            >
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="manage-departments"
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    color: '#333',
                                    transition: 'color 0.3s',
                                }}
                                onMouseOver={(e) => (e.target.style.color = '#007bff')}
                                onMouseOut={(e) => (e.target.style.color = '#333')}
                            >
                                Departments
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="manage-doctors"
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '18px',
                                    color: '#333',
                                    transition: 'color 0.3s',
                                }}
                                onMouseOver={(e) => (e.target.style.color = '#007bff')}
                                onMouseOut={(e) => (e.target.style.color = '#333')}
                            >
                                Doctors
                            </Link>
                        </li>
                    </ul>
                    <a
                        href="/logout"
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #007bff',
                            borderRadius: '25px',
                            color: '#007bff',
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#007bff';
                            e.target.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#007bff';
                        }}
                    >
                        Logout
                    </a>
                </div>
            </nav>

            <main
                style={{
                    padding: '20px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
