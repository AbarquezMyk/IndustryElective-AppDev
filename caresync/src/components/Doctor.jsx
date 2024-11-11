import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';

import neurologyLogo from './img/neurology-logo.svg';
import cardiacLogo from './img/cardiac-logo.svg';
import osteoporosisLogo from './img/osteoporosis-logo.svg';
import eyecareLogo from './img/eyecare-logo.svg';
import heartcareLogo from './img/heartcare-logo.svg';
import entLogo from './img/ent-logo.svg';

import doctor1 from './img/doctor1.jpg';
import doctor2 from './img/doctor2.png';
import doctor3 from './img/doctor3.png';
import Doctor4 from './img/Doctor4.png';
import Doctor5 from './img/Doctor5.png';
import Doctor6 from './img/Doctor6.png';
import Doctor7 from './img/Doctor7.jpg';
import Doctor8 from './img/Doctor8.jpg';
import Doctor9 from './img/Doctor9.png';
import Doctor10 from './img/Doctor10.png';
import Doctor11 from './img/Doctor11.jpg';
import Doctor12 from './img/Doctor12.png';
import Doctor13 from './img/Doctor13.png';
import Doctor14 from './img/Doctor14.png';
import Doctor15 from './img/Doctor15.png';
import Doctor16 from './img/Doctor16.png';
import Doctor17 from './img/Doctor17.png';
import Doctor18 from './img/Doctor18.png';

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
        "Cardiac Care": [
            { name: 'Dr. John Smith', specialty: 'Pulmonologist', image: Doctor4 },
            { name: 'Dr. Jane Doe', specialty: 'Pulmonologist', image: Doctor5 },
            { name: 'Dr. Mary Johnson', specialty: 'Pulmonologist', image: Doctor6 },
            { name: 'Dr. Peter Brown', specialty: 'Pulmonologist', image: Doctor7 }
        ],
        Osteoporosis: [
            { name: 'Dr. Kim Daniel', specialty: 'Endocrinologist', image: Doctor8 },
            { name: 'Dr. Maria Santos', specialty: 'Endocrinologist', image: Doctor9 }
        ],
        "Eye Care": [
            { name: 'Dr. Hannah Collins', specialty: 'Ophthalmologist', image: Doctor10 },
            { name: 'Dr. Jonathan Blake', specialty: 'Ophthalmologist', image: Doctor11 },
            { name: 'Dr. Isabella Hughes', specialty: 'Ophthalmologist', image: Doctor12 }
        ],
        "Heart Care": [
            { name: 'Dr. Lisa Martin', specialty: 'Cardiologist', image: Doctor13 },
            { name: 'Dr. Benjamin Foster', specialty: 'Cardiologist', image: Doctor14 },
            { name: 'Dr. Michael Jordanon', specialty: 'Cardiologist', image: Doctor15 },
            { name: 'Dr. Jason Hill', specialty: 'Cardiologist', image: Doctor16 }
        ],
        ENT: [
            { name: 'Dr. Rosie Turner', specialty: 'ENT Specialist', image: Doctor17 },
            { name: 'Dr. Robert Scott', specialty: 'ENT Specialist', image: Doctor18 }
        ]
    };

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setCurrentStep('dashboard');
    };

    const handleFindDoctor = () => setCurrentStep('doctors');

    const handleDoctorSelect = (doctor) => {
        alert(`You selected ${doctor.name}`);
        setCurrentStep('departments');
    };

    const styles = {
        app: {
            display: 'flex',
            maxWidth: '100%',
            margin: '0',
            padding: '0',
            fontFamily: 'Arial, sans-serif'
        },
        sidebar: {
            width: '250px',
            backgroundColor: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #CED4DA',
            position: 'fixed', // Fixes the sidebar to the left
            left: '0',
            top: '0',
            height: '100vh',
            zIndex: '10'
        },
        mainContent: {
            flex: 1,
            marginLeft: '250px', // Offset the main content to the right of the fixed sidebar
            padding: '20px'
        },
        sidebarLink: { textDecoration: 'none', color: '#023350', fontSize: '18px' },
        sidebarImage: { width: '20px', height: '20px', marginRight: '10px' },
        textCenter: { textAlign: 'center' },
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
        logoImage: { width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' },
        button: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.2s'
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
        doctorImage: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }
    };

    return (
        <div style={styles.app}>
            <div style={styles.sidebar}>
                <div style={{ textAlign: 'center' }}>
                    <img src={logo} alt="CareSync Logo" style={{ width: '200px', height: 'auto', marginTop: '-50px' }} />
                </div>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={dashboard} alt="Dashboard Icon" style={styles.sidebarImage} />
                        <Link to="/" style={styles.sidebarLink}>Dashboard</Link>
                    </li>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={appointment} alt="Appointments Icon" style={styles.sidebarImage} />
                        <Link to="/appointment" style={styles.sidebarLink}>Appointments</Link>
                    </li>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={payment} alt="Payments Icon" style={styles.sidebarImage} />
                        <Link to="/payments" style={styles.sidebarLink}>Payments</Link>
                    </li>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={setting} alt="Settings Icon" style={styles.sidebarImage} />
                        <Link to="/settings" style={styles.sidebarLink}>Settings</Link>
                    </li>
                </ul>
            </div>
            <div style={styles.mainContent}>
                {currentStep === 'departments' && (
                    <div style={styles.textCenter}>
                        <h1>Departments</h1>
                        <div style={styles.departments}>
                            {departments.map((dept) => (
                                <div
                                    key={dept.name}
                                    style={styles.departmentCard}
                                    onClick={() => handleDepartmentSelect(dept.name)}
                                >
                                    <img src={dept.logo} alt={dept.name} style={styles.logoImage} />
                                    <h3>{dept.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {currentStep === 'dashboard' && (
                    <div style={styles.textCenter}>
                        <h1>{selectedDepartment} Dashboard</h1>
                        <button onClick={handleFindDoctor} style={styles.button}>Find Doctor</button>
                    </div>
                )}
                {currentStep === 'doctors' && (
                    <div>
                        <h1>Doctors in {selectedDepartment}</h1>
                        <div style={styles.doctorCards}>
                            {doctors[selectedDepartment].map((doc) => (
                                <div
                                    key={doc.name}
                                    style={styles.doctorCard}
                                    onClick={() => handleDoctorSelect(doc)}
                                >
                                    <img src={doc.image} alt={doc.name} style={styles.doctorImage} />
                                    <h3>{doc.name}</h3>
                                    <p>{doc.specialty}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
