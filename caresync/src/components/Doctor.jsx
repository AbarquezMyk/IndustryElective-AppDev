import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import logout from './img/logout_icon.png';
import calendar from './img/calendar_icon.png';

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
        container: {
            display: 'flex',
            fontFamily: 'Arial',
            height: 'auto'
          },
          sidebar: {
            width: '240px',
            backgroundColor: '#FFFFFF',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
            borderRight: '1px solid #e6e6e6'
          },
          logo: {
            width: '200px',
            marginBottom: '-30px',
            marginTop: '-50px',
          },
          navList: {
            listStyle: 'none',
            padding: 0,
            width: '100%'
          },
          dashboardNavItem: {
            padding: '15px 20px',
            fontSize: '16px',
            color: '#023350',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginBottom: '10px'
          },
          appointmentsNavItem: {
            padding: '15px 20px',
            fontSize: '16px',
            color: '#023350',
            backgroundColor: '#fff',
            border: '1.5px solid #023350',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginBottom: '10px'
          },
          calendarNavItem: {
            padding: '15px 20px',
            fontSize: '16px',
            color: '#4F4F4F',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px'
          },
          paymentsNavItem: {
            padding: '15px 20px',
            fontSize: '16px',
            color: '#4F4F4F',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px'
          },
          settingsNavItem: {
            padding: '15px 20px',
            fontSize: '16px',
            color: '#4F4F4F',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          },
          navIcon: {
            width: '20px',
            height: '20px',
            marginRight: '30px'
          },
          logout: {
            marginTop: 'auto',
            marginBottom: '50px',
            color: 'red',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          },
          mainContent: {
            flex: 1,
            padding: '20px',
            backgroundColor: '#F8F9FA',
            height: '870px',
            overflowY: 'auto',
          },
          header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          },
          headerTitle: {
            fontSize: '24px',
            color: '#023350',
            marginTop: '40px',
          },
          profile: {
            display: 'flex',
            alignItems: 'center'
          },
          profileName: {
            fontSize: '16px',
            color: '#4F4F4F',
            marginTop: '40px',
          },
          filters: {
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
          },
          searchInput: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '400px'
          },
          filter: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px'
          },
          dateInput: {
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px'
          },
          appointmentSection: {
            marginTop: '45px',
          },
          sectionTitle: {
            fontSize: '20px',
            color: '#023350',
            marginBottom: '20px'
          },
          appointmentCard: {
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
            height: '90px',
            backgroundColor: '#FFF',
            borderRadius: '8px',
            border: '1px solid #e6e6e6',
            marginBottom: '10px'
          },
          doctorImage: {
            width: '65px',
            height: '70px',
            borderRadius: '50%',
            marginRight: '15px',
          },
          appointmentDetails: {
            flex: 1
          },
          doctorName: {
            fontSize: '16px',
            color: '#023350',
            marginBottom: '5px'
          },
          appointmentTime: {
            fontSize: '14px',
            color: '#4F4F4F'
          },
          appointmentActions: {
            display: 'flex',
            gap: '10px'
          },
          cancelButton: {
            padding: '5px 15px',
            border: '1px solid red',
            borderRadius: '5px',
            color: 'red',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          },
          detailButton: {
            padding: '5px 15px',
            border: '1px solid #023350',
            borderRadius: '5px',
            color: '#023350',
            backgroundColor: 'transparent',
            cursor: 'pointer'
        },
        app: {
            display: 'flex',
            maxWidth: '100%',
            margin: '0',
            padding: '0',
            fontFamily: 'Arial, sans-serif',
        },
        sidebar: {
            width: '250px',
            backgroundColor: 'white',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #CED4DA',
            position: 'fixed',
            left: '0',
            top: '0',
            height: '100vh',
            zIndex: '10',
        },
        mainContent: {
            flex: 1,
            marginLeft: '250px',
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
            padding: '25px',
            borderRadius: '10px',
            width: '275px',
            height: '300px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            fontSize: '10px' 
        },
        logoImage: { width: '120px', height: '120px', borderRadius: '50%', marginBottom: '10px' },
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
        <div style={styles.container}>
            <div style={styles.mainContent}>
                {currentStep === 'departments' && (
                    <div style={styles.textCenter}>
                        <h1>Departments</h1>
                        <div style={styles.departments}>
                            {departments.map((department) => (
                                <div
                                    key={department.name}
                                    style={styles.departmentCard}
                                    onClick={() => handleDepartmentSelect(department.name)}
                                >
                                    <img src={department.logo} alt={department.name} style={styles.logoImage} />
                                    <h2>{department.name}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentStep === 'dashboard' && (
                    <div style={styles.textCenter}>
                        <h1>{selectedDepartment} Dashboard</h1>

                        {/* Display the Neurology description */}
                        {selectedDepartment === 'Neurology' && (
                            <div style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'justify', color: '#555' }}>
                                <h2>Understanding Neurology</h2>
                                <p>
                                    At CareSync, our Neurology Department specializes in diagnosing and treating conditions that affect the brain,
                                    spinal cord, and nervous system. Our team of highly qualified neurologists is dedicated to providing comprehensive
                                    care using advanced diagnostic tools and personalized treatment plans.
                                </p>
                            </div>
                        )}

                        {/* Display the Cardiac Care description */}
                        {selectedDepartment === 'Cardiac Care' && (
                            <div style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'justify', color: '#555' }}>
                                <h2>Understanding Cardiac Care</h2>
                                <p>
                                At CareSync, our Cardiac Care Department is committed to diagnosing, treating, and managing a wide range of heart and vascular conditions. 
                                Our team of experienced cardiologists uses state-of-the-art technology and personalized treatment approaches to ensure the best outcomes for our patients.
                                 From routine check-ups to advanced cardiac procedures, we provide compassionate care tailored to each patient's unique needs.
                                </p>
                            </div>
                        )}

                         {/* Display the Osteoporosis description */}
                         {selectedDepartment === 'Osteoporosis' && (
                            <div style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'justify', color: '#555' }}>
                                <h2>Understanding Osteoporosis</h2>
                                <p>
                                At CareSync, our Osteoporosis Department is dedicated to the prevention, diagnosis, and treatment of osteoporosis and other bone health conditions.
                                Our team of specialized doctors utilizes advanced diagnostic tools and personalized treatment plans to help strengthen bones and reduce the risk of fractures. 
                                From routine bone density screenings to comprehensive management strategies, we offer compassionate care designed to support each patient's journey toward better bone health.
                                </p>
                            </div>
                        )}

                        {/* Display the Osteoporosis description */}
                        {selectedDepartment === 'Eye Care' && (
                            <div style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'justify', color: '#555' }}>
                                <h2>Understanding Eye Care</h2>
                                <p>
                                At CareSync, our Eye Care Department is committed to the prevention, diagnosis, and treatment of a wide range of vision and eye health conditions. 
                                Our team of specialized ophthalmologists uses advanced diagnostic technology and customized treatment plans to preserve and improve our patients' vision. 
                                From routine eye exams to complex eye surgeries, we provide compassionate care tailored to meet each patient's unique needs, helping them maintain their best possible vision and eye health.
                                </p>
                            </div>
                        )}

                        {/* Display the Heart Care description */}
                        {selectedDepartment === 'Heart Care' && (
                            <div style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'justify', color: '#555' }}>
                                <h2>Understanding Heart Care</h2>
                                <p>
                                At CareSync, our Heart Care Department is dedicated to the prevention, diagnosis, and treatment of various heart and vascular conditions. 
                                Our team of specialized cardiologists employs state-of-the-art diagnostic tools and individualized treatment plans to ensure optimal heart health for our patients.
                                From routine check-ups to advanced cardiac interventions, we provide compassionate care tailored to each patient's unique needs, helping them lead healthier and more active lives.
                                </p>
                            </div>
                        )}

                          {/* Display the ENT description */}
                          {selectedDepartment === 'ENT' && (
                            <div style={{ marginBottom: '20px', fontSize: '16px', textAlign: 'justify', color: '#555' }}>
                                <h2>Understanding Heart ENT</h2>
                                <p>
                                At CareSync, our ENT Department is committed to the prevention, diagnosis, and treatment of a wide range of conditions affecting the ears, nose, throat, and related structures of the head and neck. 
                                Our team of specialized otolaryngologists utilizes advanced diagnostic technology and personalized treatment plans to address our patients' unique needs. 
                                From routine exams to complex surgeries, we provide compassionate care that aims to improve our patients' overall quality of life and restore their health.
                                </p>
                            </div>
                        )}



                        



                        <button onClick={handleFindDoctor} style={styles.button}>Find Doctor</button>
                    </div>
                )}

                {currentStep === 'doctors' && (
                    <div>
                        <h2>Doctors</h2>
                        <div style={styles.doctorCards}>
                            {doctors[selectedDepartment].map((doctor) => (
                                <div
                                    key={doctor.name}
                                    style={styles.doctorCard}
                                    onClick={() => handleDoctorSelect(doctor)}
                                >
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        style={styles.doctorImage}
                                    />
                                    <h3>{doctor.name}</h3>
                                    <p>{doctor.specialty}</p>
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
