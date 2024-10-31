import React, { useState } from 'react';

// Import department logos
import neurologyLogo from './path/to/neurology-logo.svg';
import cardiacLogo from './path/to/cardiac-logo.svg';
import osteoporosisLogo from './path/to/osteoporosis-logo.svg';
import eyecareLogo from './path/to/eyecare-logo.svg';
import heartcareLogo from './path/to/heartcare-logo.svg';
import entLogo from './path/to/ent-logo.svg';

// Import doctor images
import doctor1 from './path/to/doctor1.jpg';
import doctor2 from './path/to/doctor2.png';
import doctor3 from './path/to/doctor3.png';

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
        departments: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px'
        },
        card: {
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '10px',
            width: '150px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s'
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
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
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
                                style={styles.card}
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
                    <h2>Our Doctors</h2>
                    <div style={styles.doctorCards}>
                        {doctors[selectedDepartment]?.map((doctor, index) => (
                            <div
                                key={index}
                                style={styles.card}
                                onClick={() => handleDoctorSelect(doctor)}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img src={doctor.image} alt={doctor.name} style={styles.logoImage} />
                                <p><strong>{doctor.name}</strong></p>
                                <p>{doctor.specialty}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
