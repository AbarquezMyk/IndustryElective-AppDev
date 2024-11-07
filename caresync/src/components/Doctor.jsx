import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import logo from './img/Logo1.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import calendar from './img/calendar_icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';

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


// Sidebar component
const Sidebar = () => (
    <div style={{
        width: '250px',
        backgroundColor: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: '1px solid #CED4DA',
        height: '100vh',
        fontFamily: 'Manjari, sans-serif',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <img src={logo} alt="Logo1" style={{ width: '60px', height: '60px', marginRight: '20px' }} />
            <h2 style={{
                color: '#023350',
                fontSize: '17px',
                fontWeight: 'normal',
                letterSpacing: '0.4em',
                margin: 0,
                paddingLeft: '10px',
            }}>
                CareSync
            </h2>
        </div>

        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {[
                { icon: dashboard, label: 'Dashboard', link: '/' },
                { icon: appointment, label: 'Appointments', link: '/AppointmentHistory' },
                { icon: calendar, label: 'Calendar', link: '/calendar', highlighted: true },
                { icon: payment, label: 'Payments', link: '/PaymentMethod' },
                { icon: setting, label: 'Settings', link: '/settings' },
            ].map((item, index) => (
                <li key={index} style={{
                    margin: '40px 0',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: item.highlighted ? 'transparent' : 'transparent',
                    borderRadius: '8px',
                    padding: '10px',
                    border: item.highlighted ? '2px solid #023350' : 'none',
                }}>
                    <img src={item.icon} alt={`${item.label} Icon`} style={{ width: '20px', height: '20px', marginRight: '15px', paddingLeft: '20px' }} />
                    <Link to={item.link} style={{
                        textDecoration: 'none',
                        color: '#023350',
                        fontSize: '16px',
                        letterSpacing: '0.1em',
                        paddingLeft: '30px',
                    }}>
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>

        <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: '20px' }}>
            <button
                onClick={() => console.log("Logout")}
                style={{
                    color: '#E74C3C',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    letterSpacing: '0.1em',
                    fontSize: '16px',
                    padding: '10px 20px',
                }}
            >
                <img src={logout} alt="Logout Icon" style={{ width: '20px', height: '20px', marginRight: '10px', paddingLeft: '20px' }} />
                <span style={{ paddingLeft: '30px' }}>Log Out</span>
            </button>
        </div>
    </div>
);

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
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        },
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
        doctorImage: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' },
        doctorName: { fontSize: '18px', fontWeight: 'bold' },
        doctorSpecialty: { color: '#777', fontSize: '14px' },
        rating: { color: '#FFD700', fontSize: '14px' },
        cardiacCareInfo: {
            textAlign: 'left',
            marginTop: '30px'
        },
        neurologyInfo: {
            textAlign: 'left',
            marginTop: '30px'
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
                    <p>Welcome to the {selectedDepartment} Department. Here we specialize in personalized care, focusing on your unique needs and treatment options.</p>
                    
                    {/* Understanding Cardiac Care Section */}
                    {selectedDepartment === 'Cardiac Care' && (
                        <div style={styles.cardiacCareInfo}>
                            <h3>Understanding Cardiac Care</h3>
                            <p>At CareSync, our Cardiac Care Department is committed to diagnosing, treating, and managing a wide range of heart and vascular conditions. Our team of experienced cardiologists uses state-of-the-art technology and personalized treatment approaches to ensure the best outcomes for our patients. From routine check-ups to advanced cardiac procedures, we provide compassionate care tailored to each patient's unique needs.</p>
                        </div>
                    )}
                    
                    {/* Understanding Neurology Section */}
                    {selectedDepartment === 'Neurology' && (
                        <div style={styles.neurologyInfo}>
                            <h3>Understanding Neurology</h3>
                            <p>At CareSync, our Neurology Department specializes in diagnosing and treating conditions that affect the brain, spinal cord, and nervous system. Our team of highly qualified neurologists is dedicated to providing comprehensive care using advanced diagnostic tools and personalized treatment plans.</p>
                        </div>
                    )}
         
                     {/* Understanding Osteo Care Section */}
                     {selectedDepartment === 'Osteo Care' && (
                        <div style={styles.OsteoporosisInfo}>
                            <h3>Understanding Osteoporosis</h3>
                            <p>At CareSync, our Osteoporosis Department is dedicated to the prevention, diagnosis, and treatment of osteoporosis and other bone health conditions. Our team of specialized doctors utilizes advanced diagnostic tools and personalized treatment plans to help strengthen bones and reduce the risk of fractures. From routine bone density screenings to comprehensive management strategies, we offer compassionate care designed to support each patient's journey toward better bone health.</p>
                        </div>
                    )}





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
                    <h2>Our Doctors in {selectedDepartment}</h2>
                    <div style={styles.doctorCards}>
                        {doctors[selectedDepartment].map(doctor => (
                            <div
                                key={doctor.name}
                                style={styles.doctorCard}
                                onClick={() => handleDoctorSelect(doctor)}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <img src={doctor.image} alt={doctor.name} style={styles.doctorImage} />
                                <p style={styles.doctorName}>{doctor.name}</p>
                                <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
                                <p style={styles.rating}>⭐⭐⭐⭐⭐</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
