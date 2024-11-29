import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.png';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const adminCredentials = { email, password };

        axios
            .post('http://localhost:8080/api/admin/login', adminCredentials)
            .then((response) => {
                setSuccess('Login successful');
                setError(null);
                navigate('/admin');
            })
            .catch(() => {
                setError('Invalid email or password');
                setSuccess(null);
            });
    };

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                lineHeight: '1.5',
                color: '#333',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f3f4f6',
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '30px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <img
                    src={logo}
                    alt="Logo"
                    style={{ display: 'block', margin: '0 auto 20px', width: '150px' }}
                />
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>
                    Admin Login
                </h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="email"
                        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        aria-label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '90%',
                            padding: '8px 10px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="password"
                        style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '90%',
                            padding: '8px 10px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            transition: 'border-color 0.3s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '95%',
                        padding: '10px',
                        fontSize: '14px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
