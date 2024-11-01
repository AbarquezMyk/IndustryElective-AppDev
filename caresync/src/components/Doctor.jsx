import React, { useState } from 'react';

// Import department logos
import neurologyLogo from './img/neurology-logo.svg';
import cardiacLogo from './img/cardiac-logo.svg';
import osteoporosisLogo from './img/osteoporosis-logo.svg';
import eyecareLogo from './img/eyecare-logo.svg';
import heartcareLogo from './img/heartcare-logo.svg';
import entLogo from './img/ent-logo.svg';

// Import doctor images
import doctor1 from './img/doctor1.jpg';
import doctor2 from './img/doctor2.png';
import doctor3 from './img/doctor3.png';
import Doctor4 from './img/Doctor4.png';
import Doctor5 from './img/Doctor5.png';
import Doctor6 from './img/Doctor6.png';
import Doctor7 from './img/Doctor7.jpg';


function App() {
    const [currentStep, setCurrentStep] = useState('departments');
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const departments = [
        { name: 'Neurology', logo: neurologyLogo },
        { name: 'Cardiac Care', logo: cardiacLogo },
        { name: 'Osteoporosis', logo: osteoporosisLogo },
        { name: 'Eye Care', logo: eyecareLogo },
        { name: 'Heart Care', logo: heartcareLogo },
        { name: 'ENT', logo: entLogo }
    ];

    const doctors = {
        Neurology: [
            { name: 'Dr. Emily Carter', specialty: 'Neurologist', image: doctor1 },
            { name: 'Dr. Robert Wilson', specialty: 'Neurologist', image: doctor2 },
            { name: 'Dr. Anna Thompson', specialty: 'Neurologist', image: doctor3 }
        ],
        CardiacCare: [
            { name: 'Dr. John Smith', specialty: 'Cardiologist', image: Doctor4 },
            { name: 'Dr. Jane Doe', specialty: 'Cardiologist', image: Doctor5 },
            { name: 'Dr. Mary Johnson', specialty: 'Cardiologist', image: Doctor6 },
            { name: 'Dr. Peter Brown', specialty: 'Cardiologist', image: Doctor7 }
        ],
        // Add other departments' doctors here if needed...
    };

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setCurrentStep('dashboard');
    };

    const handleFindDoctor = () => {
        setCurrentStep('doctors');
    };

    const handleDoctorSelect = (doctor) => {
        alert(`You selected ${doctor.name}`);
        setCurrentStep('departments');
    };

    const styles = {
        app: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        },
        textCenter: {
            textAlign: 'center'
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px'
        },
        logo: {
            height: '60px'
        },
        title: {
            fontSize: '24px',
            fontWeight: '300',
            color: '#333'
        },
        brainIcon: {
            height: '50px'
        },
        departments: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px'
        },
        departmentCard: {
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '10px',
            width: '150px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        },
        logoImage: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            marginBottom: '10px'
        },
        feedbackSection: {
            margin: '20px 0',
            fontSize: '14px'
        },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
        },
        doctorCards: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            justifyContent: 'center'
        },
        doctorCard: {
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
        },
        doctorImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '10px'
        },
        doctorName: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333'
        },
        doctorSpecialty: {
            color: '#777',
            fontSize: '14px',
            marginBottom: '5px'
        },
        rating: {
            color: '#FFD700', // gold color for stars
            fontSize: '14px',
            marginBottom: '10px'
        }
    };

    return (
        <div style={styles.app}>
            {currentStep === 'departments' && (
                <div style={styles.textCenter}>
                    <h2>Our Departments</h2>
                    <div style={styles.departments}>
                        {departments.map(dept => (
                            <div
                                key={dept.name}
                                style={styles.departmentCard}
                                onClick={() => handleDepartmentSelect(dept.name)}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img src={dept.logo} alt={dept.name} style={styles.logoImage} />
                                <p>{dept.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {currentStep === 'dashboard' && (
                <div style={styles.textCenter}>
                    <h2>{selectedDepartment} Department</h2>
                    <p>Welcome to the {selectedDepartment} Department. Here we specialize in...</p>
                    <div style={styles.feedbackSection}>
                        <p><strong>Patient Feedback:</strong></p>
                        <blockquote>
                            <p>"The neurology department was very thorough and attentive."</p>
                            <footer>- Patient A</footer>
                        </blockquote>
                        <blockquote>
                            <p>"Excellent doctors and caring staff!"</p>
                            <footer>- Patient B</footer>
                        </blockquote>
                    </div>
                    <button
                        onClick={handleFindDoctor}
                        style={styles.button}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Find a Doctor
                    </button>
                </div>
            )}
            {currentStep === 'doctors' && (
                <div style={styles.textCenter}>
                    <div style={styles.header}>
                        <img src="logo.png" alt="Logo" style={styles.logo} />
                        <h2 style={styles.title}>Our Doctors</h2>
                        <img src="neurology-logo.svg" alt="Brain Icon" style={styles.brainIcon} />
                    </div>
                    <div style={styles.doctorCards}>
                        {doctors[selectedDepartment]?.map((doctor, index) => (
                            <div
                                key={index}
                                style={styles.doctorCard}
                                onClick={() => handleDoctorSelect(doctor)}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img src={doctor.image} alt={doctor.name} style={styles.doctorImage} />
                                <p style={styles.doctorName}>{doctor.name}</p>
                                <p style={styles.rating}>★★★★</p>
                                <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
