import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './css/theme.css';
import logo from './img/logo.png';
import dashboard from './img/dashboard.png';
import appointment from './img/appointment-icon.png';
import payment from './img/payment-method.png';
import setting from './img/setting.png';
import axios from 'axios';

const CreditCard = () => {
    const [cards, setCards] = useState([]);
    const [cardToEdit, setCardToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);

    useEffect(() => {
        axios.get('/api/cards')
            .then(response => setCards(response.data))
            .catch(error => console.error("There was an error fetching the cards!", error));
    }, []);

    const handleDeleteCard = (cardId) => {
        axios.post(`/api/delete_card/${cardId}/`)
            .then(() => {
                setCards(cards.filter(card => card.id !== cardId));
                setShowDeleteModal(false);
            })
            .catch(error => console.error("Error deleting card", error));
    };

    const handleShowDeleteModal = (cardId) => {
        setSelectedCardId(cardId);
        setShowDeleteModal(true);
    };

    const handleEditCard = (card) => {
        setCardToEdit(card);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = cardToEdit ? `/api/edit_card/${cardToEdit.id}/` : '/api/add_card/';
        axios.post(url, new FormData(event.target))
            .then(response => {
                if (cardToEdit) {
                    setCards(cards.map(card => (card.id === cardToEdit.id ? response.data : card)));
                } else {
                    setCards([...cards, response.data]);
                }
                setCardToEdit(null);
            })
            .catch(error => console.error("Error saving card", error));
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{
                width: '250px',
                backgroundColor: 'white',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #CED4DA',
                height: '100vh'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={logo} alt="CareSync Logo" style={{ width: '200px', height: 'auto', marginTop: '-50px' }} />
                </div>
                <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={dashboard} alt="Dashboard Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                        <Link to="/" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Dashboard</Link>
                    </li>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={appointment} alt="Appointments Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                        <Link to="/appointment" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Appointments</Link>
                    </li>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={payment} alt="Payments Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                        <Link to="/payments" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Payments</Link>
                    </li>
                    <li style={{ margin: '15px 0', display: 'flex', alignItems: 'center' }}>
                        <img src={setting} alt="Settings Icon" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                        <Link to="/settings" style={{ textDecoration: 'none', color: '#023350', fontSize: '18px' }}>Settings</Link>
                    </li>
                </ul>
                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                    <button
                        onClick={() => console.log("Logout")}
                        style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            <main style={{ margin: 'auto', maxWidth: '800px' }}>
                <h1>Payment Settings</h1>
                <h2>Saved Cards</h2>
                <p>Total Cards: {cards.length}</p>
                <ul>
                    {cards.map(card => (
                        <li key={card.id}>
                            <span>{card.masked_card_number}</span>
                            <button onClick={() => handleEditCard(card)}>Edit</button>
                            <button onClick={() => handleShowDeleteModal(card.id)}>Delete</button>
                        </li>
                    ))}
                </ul>

                {showDeleteModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
                            <p>Are you sure you want to delete this card?</p>
                            <button onClick={() => handleDeleteCard(selectedCardId)}>Confirm Delete</button>
                            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                <h2>{cardToEdit ? 'Edit Card' : 'Add New Card'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Cardholder Name:</label>
                        <input type="text" name="cardholder_name" defaultValue={cardToEdit?.cardholder_name || ''} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Card Number:</label>
                        <input type="text" name="card_number" defaultValue={cardToEdit?.card_number || ''} style={{ width: '100%', padding: '8px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Expiration Date:</label>
                            <input type="month" name="expiration_date" defaultValue={cardToEdit?.expiration_date || ''} style={{ width: '100%', padding: '8px' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>CVC:</label>
                            <input type="text" name="cvc" defaultValue={cardToEdit?.cvc || ''} style={{ width: '100%', padding: '8px' }} />
                        </div>
                    </div>
                    <button type="submit" style={{ padding: '10px 20px' }}>{cardToEdit ? 'Save Changes' : 'Add Card'}</button>
                    {cardToEdit && <button onClick={() => setCardToEdit(null)} style={{ marginLeft: '10px', padding: '10px 20px' }}>Cancel</button>}
                </form>
            </main>
        </div>
    );
};

export default CreditCard;
