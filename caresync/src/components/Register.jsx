import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './img/logo.png';

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        // Log the form data to inspect what is being captured
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');  // Change here from confirmpassword to confirmPassword
        const email = formData.get('email');

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate password complexity
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and include a number, an uppercase, and a lowercase letter.');
            return;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const data = {
            username: formData.get('username'),
            name: formData.get('name'),
            email: email,
            phoneNumber: formData.get('phoneNumber'),
            password: password,
            confirmPassword: confirmPassword,  // Make sure to send the confirmPassword field as well
            googleId: null, // If the user registers without Google, send null for google_id
            isNewUser: true, // Assuming this is a new user
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Handle response
            if (response.ok) {
                const result = await response.json();
                const token = result.token;
                const userId = result.id;

                if (token && userId) {
                    // Store the required keys in local storage
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('name', data.name);
                    localStorage.setItem('email', data.email); // Add email to localStorage
                    localStorage.setItem('phoneNumber', data.phoneNumber); // Add phone number to localStorage
                
                    alert('Registration successful! Redirecting to login page.');
                    navigate('/login');
                }
                
            } else {
                // Handle error response
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { message: 'Registration failed. Please try again.' };
                }
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
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            margin: '20px auto',
        },
        h2: {
            marginBottom: '15px',
            color: '#2d3e50',
            textAlign: 'center',
        },
        input: {
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #d9d9d9',
            width: '100%',
            fontSize: '14px',
        },
        button: {
            backgroundColor: '#2d3e50',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%',
        },
        googleButton: {
            backgroundColor: 'white',
            border: '1px solid #d9d9d9',
            color: '#2d3e50',
            padding: '8px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            fontSize: '14px',
            marginBottom: '15px',
        },
        googleIcon: {
            marginRight: '8px',
        },
        checkboxContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '15px',
        },
        checkbox: {
            marginRight: '10px',
            cursor: 'pointer',
        },
        link: {
            color: '#2d3e50',
            textDecoration: 'underline',
        },
    };

    return (
        <main>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3">
                <div className="container" style={{ marginTop: '-35px' }}>
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="200" alt="logo" />
                    </Link>
                    <div>
                        <span style={{ color: '#2d3e50' }}>Already have an account?</span>
                        <Link to="/login" style={{ color: '#2d3e50', marginLeft: '5px' }}>Log In</Link>
                    </div>
                </div>
            </nav>

            <section className="py-4" style={{ marginTop: '50px' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div style={styles.registerSection}>
                            <h2 style={styles.h2}>Create an Account</h2>
                            <p style={{ color: '#2d3e50', textAlign: 'center', marginBottom: '15px' }}>
                                Join our community and start booking appointments with ease.
                            </p>
                            <button style={styles.googleButton} type="button">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
                                    alt="Google Logo"
                                    style={{ width: '18px', ...styles.googleIcon }}
                                />
                                Sign up with Google
                            </button>
                            <p style={{ color: 'black', textAlign: 'center', margin: '15px 0' }}>⸻⸻⸻ or ⸻⸻⸻</p>
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="username" placeholder="Username" required style={styles.input} />
                                <input type="text" name="name" placeholder="Full Name" required style={styles.input} />
                                <input type="email" name="email" placeholder="Email" required style={styles.input} />
                                <input type="text" name="phoneNumber" placeholder="Phone Number" required style={styles.input} />
                                <input type="password" name="password" placeholder="Password" required style={styles.input} />
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" required style={styles.input} />
                                <div style={styles.checkboxContainer}>
                                    <input type="checkbox" id="terms" name="terms" required style={styles.checkbox} />
                                    <label htmlFor="terms">
                                        I agree to the <Link to="/terms" style={styles.link}>Terms and Conditions</Link>
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
