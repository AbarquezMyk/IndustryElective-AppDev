import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DoctorDetails from './DoctorDetails';
import { useNavigate } from 'react-router-dom';


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
    const [selectedDoctor, setSelectedDoctor] = useState(null); // <-- Add this line
    const navigate = useNavigate();


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
      navigate('/doctor-details', { state: { doctor } });
    };

    const styles = {
      container: {
        display: 'flex',
        fontFamily: 'Arial, Helvetica, sans-serif',
        height: 'auto',
        backgroundColor: '#FAFAFA',
      },
      sidebar: {
        width: '260px',
        backgroundColor: '#2C3E50',
        color: '#ECF0F1',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '25px 15px',
        position: 'fixed',
        left: '0',
        top: '0',
        boxShadow: '3px 0 6px rgba(0, 0, 0, 0.2)',
      },
      logo: {
        width: '200px',
        marginBottom: '40px',
      },
      navList: {
        listStyle: 'none',
        padding: 0,
        width: '100%',
        textAlign: 'left',
        marginTop: '20px',
      },
      navItem: {
        padding: '15px 20px',
        fontSize: '15px',
        color: '#BDC3C7',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s',
        borderRadius: '5px',
      },
      navItemHover: {
        backgroundColor: '#34495E',
        color: '#ECF0F1',
      },
      navIcon: {
        width: '22px',
        height: '22px',
        marginRight: '12px',
      },
      logout: {
        marginTop: 'auto',
        padding: '12px 18px',
        color: '#E74C3C',
        cursor: 'pointer',
        fontSize: '15px',
        border: '1px solid #E74C3C',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        transition: 'all 0.3s',
      },
      logoutHover: {
        backgroundColor: '#E74C3C',
        color: '#FFF',
      },
      mainContent: {
        flex: 1,
        marginLeft: '260px',
        padding: '35px',
        backgroundColor: '#FFF',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
      header: {
        fontSize: '22px',
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: '25px',
      },
      departments: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '25px',
      },
      departmentCard: {
        backgroundColor: '#ECF0F1',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
      },
      departmentCardHover: {
        transform: 'scale(1.05)',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
      },
      departmentLogo: {
        width: '70px',
        height: '70px',
        marginBottom: '10px',
      },
      departmentName: {
        fontSize: '17px',
        fontWeight: '500',
        color: '#2C3E50',
      },
      button: {
        backgroundColor: '#3498DB',
        color: '#FFF',
        padding: '12px 18px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '15px',
        transition: 'background-color 0.3s',
      },
      buttonHover: {
        backgroundColor: '#2980B9',
      },
      doctorImage: {
        width: '80%',
        height: '140px',
        objectFit: 'cover',
        borderRadius: '8px',
      },
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
                        <h1>{selectedDepartment} </h1>

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
