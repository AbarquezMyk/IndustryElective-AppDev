import React from 'react';
import logo from './logo.png';

function OnlineForm() {
  return (
    <div style={styles.formContainer}>
      <div style={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>ONLINE FORM</h1>
      </div>
      <form style={styles.form}>
        <div style={styles.row}>
          <input type="text" placeholder="First Name" style={styles.input} />
          <input type="text" placeholder="Last Name" style={styles.input} />
        </div>
        <div style={styles.row}>
          <input type="date" placeholder="MM-DD-YYYY" style={styles.input} />
          <select style={styles.input}>
            <option>Please select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <select style={styles.input}>
            <option>Please select</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
        <div style={styles.row}>
          <input type="number" placeholder="Height (inches)" style={styles.input} />
          <input type="number" placeholder="Weight (pounds)" style={styles.input} />
        </div>
        <div style={styles.row}>
          <input type="text" placeholder="Phone Number" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
        </div>
        <input type="text" placeholder="Address" style={{ ...styles.input, width: '100%' }} />
        <div style={styles.row}>
          <input type="text" placeholder="City" style={styles.input} />
          <input type="text" placeholder="State/Province" style={styles.input} />
          <input type="text" placeholder="Postal Code" style={styles.input} />
        </div>
        <div style={styles.row}>
          <p>Taking any medications, currently?</p>
          <label>
            <input type="radio" name="medications" value="yes" /> Yes
          </label>
          <label>
            <input type="radio" name="medications" value="no" /> No
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    color: '#4F4F4F',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logo: {
    height: '50px',
    marginRight: '10px',
  },
  title: {
    fontSize: '36px',
    letterSpacing: '2px',
    color: '#4F4F4F',
  },
  form: {
    width: '80%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  input: {
    width: '48%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #4F4F4F',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4F4F4F',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default OnlineForm;