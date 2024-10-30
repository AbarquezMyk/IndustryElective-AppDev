import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message on new submission
        try {
            const response = await fetch('http://your-api-url.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json(); // Parse the response as JSON

            if (response.ok) {
                console.log('Login successful:', data); // Debugging line
                navigate('/Home');
            } else {
                // Check the response from the server for a specific error message
                setError(data.message || 'Invalid email or password.');
                console.log('Login failed:', data); // Debugging line
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Error during login:', err); // Log error details
        }
    };

    return (
        <section style={styles.section}>
            <div style={styles.textCenter}>
                <h1 style={styles.title}>W E L C O M E&ensp;B A C K</h1>
                <p style={styles.subtitle}>Find your doctor and make an appointment.</p>
            </div>

            <div style={styles.loginSection}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={styles.loginOptions}>
                    <button style={styles.googleButton}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                            alt="Google Logo"
                            style={styles.googleIcon}
                        />
                        Log in with Google
                    </button>
                </div>
                <p style={styles.orSeparator}>⸻⸻⸻⸻ or ⸻⸻⸻⸻</p>
                <form method="post" action="/login" onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    <button
                        type="button"
                        onClick={() => console.log('Forgot Password clicked')}
                        style={styles.forgotPasswordButton}
                    >
                        Forgot Password?
                    </button>
                    <button type="submit" style={styles.submitButton}>Log In</button>
                </form>
            </div>
        </section>
    );
};

const styles = {
    section: {
        paddingTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textCenter: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    title: {
        fontSize: '40px',
        margin: '10px 0',
    },
    subtitle: {
        fontSize: '20px',
    },
    loginSection: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
    },
    loginOptions: {
        marginBottom: '20px',
    },
    googleButton: {
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        color: 'black',
        fontSize: '12px',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    googleIcon: {
        marginRight: '8px',
        width: '16px',
        height: '16px',
    },
    orSeparator: {
        color: 'black',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '5px',
        border: '1px solid #d9d9d9',
        width: '65%',
        maxWidth: '300px',
    },
    forgotPasswordButton: {
        color: '#2d3e50',
        background: 'none',
        border: 'none',
        textDecoration: 'underline',
        cursor: 'pointer',
        marginBottom: '20px',
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#2d3e50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '50%',
        maxWidth: '300px',
    },
};

export default Login;