import React, { useState } from 'react';

function OnlineForm() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [takingMedications, setTakingMedications] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      name,
      dateOfBirth,
      sex,
      maritalStatus,
      height,
      weight,
      phoneNumber,
      email,
      address,
      takingMedications,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="sex">Sex:</label>
        <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
          <option value="">Please select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="maritalStatus">Marital Status:</label>
        <select
          id="maritalStatus"
          value={maritalStatus}
          onChange={(e) => setMaritalStatus(e.target.value)}
        >
          <option value="">Please select</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
        </select>
      </div>

      <div>
        <label htmlFor="takingMedications">Taking any medications, currently?</label>
        <div>
          <input
            type="radio"
            id="yes"
            name="takingMedications"
            value="yes"
            checked={takingMedications}
            onChange={() => setTakingMedications(true)}
          />
          <label htmlFor="yes">Yes</label>
          <input
            type="radio"
            id="no"
            name="takingMedications"
            value="no"
            checked={!takingMedications}
            onChange={() => setTakingMedications(false)}
          />
          <label htmlFor="no">No</label>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default OnlineForm;