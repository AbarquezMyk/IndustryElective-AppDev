import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './img/logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitting form...');
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);

                // Save email and userId in localStorage for later use
                localStorage.setItem('userEmail', email);  // Storing email
                localStorage.setItem('userId', data.id);   // Storing userId (make sure 'id' is in the response)

                // Navigate to the next page
                navigate('/appointment-history');
            } else {
                setError(data.message || 'Invalid email or password.');
                console.log('Login failed:', data);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Error during login:', err);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
                <div className="container d-flex justify-content-between" style={{ flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        <Link className="navbar-brand" to="/" style={{ marginLeft: '20px', marginTop: "-50px" }}>
                            <img src={logo} width="230" alt="logo" />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginRight: '20px' }}>
                        <Link to="/register" style={{ color: '#2d3e50', marginLeft: '5px', marginTop: "-140px", marginRight: "30px" }}>
                            Create an account
                        </Link>
                    </div>
                </div>
            </nav>

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
                    <form onSubmit={handleSubmit} style={styles.form}>
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
                        <button type="submit" style={styles.button}>Log In</button>
                    </form>
                </div>
            </section>
        </>
    );
};

const styles = {
    section: {
        marginTop: '50px',
    },
    textCenter: {
        textAlign: 'center',
    },
    title: {
        fontSize: '40px',
        marginBottom: '-5px',
        marginTop: '80px',
        color: '#023350'
    },
    subtitle: {
        fontSize: '20px',
        marginBottom: '-30px',
        color: '#023350'
    },
    loginSection: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '20px auto',
    },
    loginOptions: {
        marginBottom: '20px',
    },
    googleButton: {
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        color: 'black',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    googleIcon: {
        width: '20px',
        marginRight: '10px',
    },
    orSeparator: {
        textAlign: 'center',
        padding: '20px 0',
        color: 'black',
        marginBottom: '5px',
        marginTop: '-17px'
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
    },
    button: {
        backgroundColor: '#2d3e50',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '80%',
        margin: '0 auto',
    },
};

export default Login;
