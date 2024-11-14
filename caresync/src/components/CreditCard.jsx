import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './css/theme.css';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import axios from 'axios';
import logout from './img/logout_icon.png';
import calendar from './img/calendar_icon.png';

const CreditCard = () => {
    const [cards, setCards] = useState([]);
    const [cardToEdit, setCardToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expirationDate: '',
        cvc: ''
    });

    useEffect(() => {
        axios.get('/api/cards')
            .then(response => setCards(response.data))
            .catch(error => console.error("There was an error fetching the cards!", error));
    }, []);

    const handleDeleteCard = (cardId) => {
        axios.delete(`/api/delete_card/${cardId}`)
            .then(response => {
                if (response.status === 204) {
                    setCards(cards.filter(card => card.id !== cardId));
                    setShowDeleteModal(false);
                }
            })
            .catch(error => {
                console.error("Error deleting card", error);
                alert("Failed to delete card. Please try again.");
            });
    };

    const handleShowDeleteModal = (cardId) => {
        setSelectedCardId(cardId);
        setShowDeleteModal(true);
    };

    const handleEditCard = (card) => {
        setCardToEdit(card);
        setFormData({
            cardholderName: card.cardholderName,
            cardNumber: card.cardNumber,
            expirationDate: card.expirationDate.slice(0, 7), // Format for the month input
            cvc: card.cvc
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = cardToEdit ? `/api/edit_card/${cardToEdit.id}` : '/api/add_card';

        const data = {
            cardholderName: formData.cardholderName,
            cardNumber: formData.cardNumber,
            expirationDate: formData.expirationDate + "-01",
            cvc: formData.cvc
        };

        axios.post(url, data)
            .then(response => {
                if (cardToEdit) {
                    // Update the edited card in the list
                    setCards(cards.map(card => (card.id === cardToEdit.id ? response.data : card)));
                } else {
                    // Add new card to the list
                    setCards([...cards, response.data]);
                }
                // Reset form data after saving
                setFormData({
                    cardholderName: '',
                    cardNumber: '',
                    expirationDate: '',
                    cvc: ''
                });
                setCardToEdit(null); // Clear the edit state
            })
            .catch(error => {
                console.error("Error saving card", error);
                alert("Failed to save card. Please try again.");
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
      <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <img src={logo} alt="CareSync Logo" style={styles.logo} />
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.dashboardNavItem}>
              <img src={dashboard} alt="Dashboard" style={styles.navIcon} />
              Dashboard
            </li>
            <li style={styles.appointmentsNavItem}>
              <img src={appointment} alt="Appointments" style={styles.navIcon} />
              <Link to="/appointment-history" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Appointments</Link>
            </li>
            <li style={styles.calendarNavItem}>
              <img src={calendar} alt="Calendar" style={styles.navIcon} />
              <Link to="/calendar" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Calendar</Link>
            </li>
            <li style={styles.paymentsNavItem}>
              <img src={payment} alt="Payments" style={styles.navIcon} />
              <Link to="/payment-methods" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Payments</Link>
            </li>
            <li style={styles.settingsNavItem}>
              <img src={setting} alt="Settings" style={styles.navIcon} />
              <Link to="/settings" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Settings</Link>
            </li>
          </ul>
        </nav>
        <div style={styles.logout}>
          <img src={logout} alt="Log Out" style={styles.navIcon} />
          <Link to="/" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Log Out</Link>
        </div>
      </div>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px', maxWidth: '900px', margin: 'auto' }}>
                <h1>Payment Settings</h1>
                <h2>Saved Cards</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {cards.map(card => (
                        <div key={card.id} style={{
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                            padding: '20px',
                            width: '250px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center'
                        }}>
                            <p><strong>{card.cardholderName}</strong></p>
                            <p>{card.maskedCardNumber}</p>
                            <p>Expires: {card.expirationDate.slice(0, 7)}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <button onClick={() => handleEditCard(card)} style={{ marginRight: '10px' }}>Edit</button>
                                <button onClick={() => handleShowDeleteModal(card.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {showDeleteModal && (
                    <div className="modal" style={{
                        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <div className="modal-content" style={{
                            backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '300px', textAlign: 'center'
                        }}>
                            <span className="close" onClick={() => setShowDeleteModal(false)} style={{ cursor: 'pointer', float: 'right', fontSize: '20px' }}>&times;</span>
                            <p>Are you sure you want to delete this card?</p>
                            <button onClick={() => handleDeleteCard(selectedCardId)} style={{ marginRight: '10px' }}>Confirm</button>
                            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                <h2>{cardToEdit ? 'Edit Card' : 'Add New Card'}</h2>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginTop: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Cardholder Name:</label>
                        <input
                            type="text"
                            name="cardholderName"
                            value={formData.cardholderName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CED4DA' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Card Number:</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CED4DA' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Expiration Date:</label>
                        <input
                            type="month"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CED4DA' }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>CVC:</label>
                        <input
                            type="text"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #CED4DA' }}
                        />
                    </div>
                    <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        {cardToEdit ? 'Save Changes' : 'Add Card'}
                    </button>
                </form>
            </main>
        </div>
    );
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
      display: 'flex',
      alignItems: 'center',
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
      marginBottom: '10px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      marginBottom: '10px',
      border: '1.5px solid #023350',
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
    }
  };

export default CreditCard;
