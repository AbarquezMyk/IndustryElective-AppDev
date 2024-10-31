import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './img/logo.png';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password1'),
        };

        try {
            const response = await fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
                alert('Registration failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration error. Please try again.');
        }
    };

    const styles = {
        registerSection: {
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '20px auto',
        },
        h2: {
            marginBottom: '10px',
            color: '#2d3e50',
            textAlign: 'center',
        },
        formRow: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
        },
        input: {
            padding: '10px',
            marginBottom: '20px',
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
        checkboxContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '-20px',
            marginBottom: '5px',
            marginLeft: '28px',
        },
        checkbox: {
            width: '20px',
            height: '15px',
            marginTop: '20px',
            marginRight: '10px',
            cursor: 'pointer',
            accentColor: '#2d3e50',
        },
        link: {
            color: '#2d3e50',
            textDecoration: 'underline',
        },
        titleContainer: {
            textAlign: 'center',
            margin: '10px 0',
        },
    };

    return (
        <main className="main" id="top">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
                <div className="container d-flex justify-content-between">
                    <Link className="navbar-brand" to="/" style={{ flexGrow: 1 }}>
                        <img src={logo} width="160" alt="logo" />
                    </Link>
                    <Link to="/login" style={{ color: '#2d3e50', marginLeft: '20px' }}>
                        Already have an account? Log In
                    </Link>
                </div>
            </nav>

            <section className="py-xxl-10 pb-0" id="home" style={{ marginTop: '50px' }}>
                <div className="container">
                    <div className="row min-vh-xl-100 min-vh-xxl-25 align-items-center justify-content-center">
                        <div style={styles.titleContainer}>
                            <h1 style={{ fontSize: '40px', fontFamily: "'Manjari', sans-serif", marginBottom: "-10px"}}>C R E A T E&ensp;A N&ensp;A C C O U N T</h1>
                            <p style={{ fontSize: '20px', fontFamily: "'Manjari', sans-serif", marginBottom: "-27px"}}>Join our community and start booking appointments with ease.</p>
                        </div>

                        <div style={styles.registerSection}>
                            <div style={{ marginBottom: '20px' }}>
                                <button style={styles.googleButton} type="button">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png" alt="Google Logo" style={{ width: '20px' }} />
                                    Sign up with Google
                                </button>
                            </div>
                            <p style={{ color: 'black', textAlign: 'center', paddingBottom: '20px' }}>⸻⸻⸻⸻⸻⸻⸻ or ⸻⸻⸻⸻⸻⸻⸻</p>

                            <form onSubmit={handleSubmit} style={{ marginTop: '-20px', textAlign: 'center' }}>
                                <div style={styles.formRow}>
                                    <input type="text" name="first_name" placeholder="First Name" required style={styles.input} />
                                    <input type="text" name="last_name" placeholder="Last Name" required style={styles.input} />
                                </div>
                                <input type="email" name="email" placeholder="Email" required style={styles.input} />
                                <input type="password" name="password1" placeholder="Password" required style={styles.input} />
                                <input type="password" name="password2" placeholder="Confirm Password" required style={styles.input} />

                                <div style={styles.checkboxContainer}>
                                    <input type="checkbox" id="terms" name="terms" required style={styles.checkbox} />
                                    <label htmlFor="terms">
                                        I agree to the <button type="button" onClick={() => alert('Terms and Conditions')} style={styles.link}>Terms and Conditions</button>
                                    </label>
                                </div>

                                <button type="submit" style={styles.button}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Register;