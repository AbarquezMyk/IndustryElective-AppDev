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
      <div>
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

export default CreditCard;
