import React, { useState } from 'react';
import axios from 'axios';

const Patient = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [allergies, setAllergies] = useState('');
    const [previousVisit, setPreviousVisit] = useState('');
    const [nextVisit, setNextVisit] = useState('');
    const [nextKins, setNextKins] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('dateOfBirth', dateOfBirth);
        formData.append('gender', gender);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('allergies', allergies);
        formData.append('previousVisit', previousVisit);
        formData.append('nextVisit', nextVisit);
        formData.append('nextKins', nextKins);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            const response = await axios.post('/api/patient/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                alert('Profile saved successfully!');
            }
        } catch (error) {
            console.error("Error saving profile data:", error);
            alert("Failed to save profile. Try again.");
            if (error.response) {
                console.error("Response data:", error.response.data); // Log response data
                console.error("Response status:", error.response.status); // Log response status
            }
        }
    };

    return (
        <div>
            <h1>Patient Profile</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Allergies"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Previous Visit"
                    value={previousVisit}
                    onChange={(e) => setPreviousVisit(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Next Visit"
                    value={nextVisit}
                    onChange={(e) => setNextVisit(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Next of Kin"
                    value={nextKins}
                    onChange={(e) => setNextKins(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default Patient;