import React, { useState } from 'react';

// Sample departments and doctors data
const departments = [
    { name: 'Neurology', logo: '/path/to/neurology-logo.svg' },
    { name: 'Cardiac Care', logo: '/path/to/cardiac-logo.svg' },
    { name: 'Osteoporosis', logo: '/path/to/osteoporosis-logo.svg' },
    { name: 'Eye Care', logo: '/path/to/eyecare-logo.svg' },
    { name: 'Heart Care', logo: '/path/to/heartcare-logo.svg' },
    { name: 'ENT', logo: '/path/to/ent-logo.svg' }
];

const doctors = {
    Neurology: [
        { name: 'Dr. Emily Carter', specialty: 'Neurologist', image: '/path/to/doctor1.png' },
        { name: 'Dr. Robert Wilson', specialty: 'Neurologist', image: '/path/to/doctor2.png' },
        { name: 'Dr. Anna Thompson', specialty: 'Neurologist', image: '/path/to/doctor3.png' }
    ],
    // Add other departments' doctors here...
};

function DepartmentSelection({ onSelect }) {
    return (
        <div>
            <h2>Our Departments</h2>
            <div className="departments">
                {departments.map(dept => (
                    <div key={dept.name} onClick={() => onSelect(dept.name)}>
                        <img src={dept.logo} alt={dept.name} />
                        <p>{dept.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DepartmentDashboard({ department, onFindDoctor }) {
    return (
        <div>
            <h2>{department} Department</h2>
            <p>Welcome to the {department} Department. Here we specialize in...</p>
            {/* Department description and feedback area */}
            <button onClick={onFindDoctor}>Find a Doctor</button>
        </div>
    );
}

function DoctorsList({ department, onSelectDoctor }) {
    return (
        <div>
            <h2>Our Doctors</h2>
            <div className="doctors">
                {doctors[department].map((doctor, index) => (
                    <div key={index} onClick={() => onSelectDoctor(doctor)}>
                        <img src={doctor.image} alt={doctor.name} />
                        <p>{doctor.name}</p>
                        <p>{doctor.specialty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function App() {
    const [currentStep, setCurrentStep] = useState('departments');
    const [selectedDepartment, setSelectedDepartment] = useState(null);

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

    return (
        <div>
            {currentStep === 'departments' && (
                <DepartmentSelection onSelect={handleDepartmentSelect} />
            )}
            {currentStep === 'dashboard' && (
                <DepartmentDashboard department={selectedDepartment} onFindDoctor={handleFindDoctor} />
            )}
            {currentStep === 'doctors' && (
                <DoctorsList department={selectedDepartment} onSelectDoctor={handleDoctorSelect} />
            )}
        </div>
    );
}
