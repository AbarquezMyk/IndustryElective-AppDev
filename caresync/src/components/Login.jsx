import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import logo from './img/logo.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle form login submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const data = response.data;

                // Store the token and user details in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.id);
                localStorage.setItem('username', data.username);
                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email); // Store email
                localStorage.setItem('phoneNumber', data.phoneNumber); // Store phone number

                // Redirect based on the new user status
                if (data.isNewUser) {
                    navigate('/medical-history');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError(err.response?.data.message || 'Invalid username or password.');
        }
    };

    // Handle Google login success
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/google-login', {
                idToken: credentialResponse.credential,
            });

            if (response.status === 200) {
                const data = response.data;

                // Store token and user details in local storage
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('userId', data.id);
                localStorage.setItem('username', data.username);
                localStorage.setItem('name', data.name);

                // Redirect based on the new user status
                if (data.isNewUser) {
                    navigate('/medical-history');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Google login failed. Please try again.');
        }
    };

    // Handle Google login failure
    const handleGoogleFailure = () => {
        setError('Unable to login with Google. Please try again.');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
                <div className="container d-flex justify-content-between">
                    <Link className="navbar-brand" to="/" style={{ marginLeft: '20px' }}>
                        <img src={logo} width="230" alt="logo" />
                    </Link>
                    <Link to="/register" style={{ color: '#2d3e50', marginRight: '20px' }}>
                        Create an account
                    </Link>
                </div>
            </nav>

            <section style={styles.section}>
                <div style={styles.textCenter}>
                    <h1 style={styles.title}>W E L C O M E&ensp;B A C K</h1>
                    <p style={styles.subtitle}>Find your doctor and make an appointment.</p>
                </div>

                <div style={styles.loginSection}>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                    <div style={styles.loginOptions}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            useOneTap
                        />
                    </div>

                    <p style={styles.orSeparator}>⸻⸻⸻⸻ or ⸻⸻⸻⸻</p>

                    <form onSubmit={handleSubmit} style={styles.form}>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            aria-label="Username"
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            aria-label="Password"
                            style={styles.input}
                        />
                        <button type="submit" style={styles.button}>
                            Log In
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

// Inline styles
const styles = {
    section: {
        marginTop: '100px', // Adjusted for navbar height
        paddingBottom: '50px', // Spacing below login section
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '40px',
        color: '#023350',
    },
    subtitle: {
        fontSize: '20px',
        color: '#023350',
    },
    loginSection: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    loginOptions: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    orSeparator: {
        textAlign: 'center',
        padding: '20px 0',
        color: 'black',
        marginBottom: '10px',
    },
    form: {
        textAlign: 'center',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #d9d9d9',
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        backgroundColor: '#2d3e50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '80%',
        margin: '10px auto',
    },
};

export default Login;
