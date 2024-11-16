import React, { useState, useEffect } from 'react';
import './css/theme.css';
import axios from 'axios';

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
            expirationDate: card.expirationDate.slice(0, 7),
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
                    setCards(cards.map(card => (card.id === cardToEdit.id ? response.data : card)));
                } else {
                    setCards([...cards, response.data]);
                }
                setFormData({
                    cardholderName: '',
                    cardNumber: '',
                    expirationDate: '',
                    cvc: ''
                });
                setCardToEdit(null);
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
            <main style={{ flex: 1, padding: '40px', maxWidth: '900px', margin: 'auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h1>Payment Settings</h1>
                </div>
                <h2>Saved Cards</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    {cards.map(card => (
                        <div key={card.id} style={{
                            background: 'linear-gradient(135deg, #007BFF, #0056b3)',
                            borderRadius: '12px',
                            padding: '20px',
                            color: 'white',
                            position: 'relative',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '200px'
                        }}>
                            <div>
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{card.cardholderName}</p>
                                <p style={{ fontSize: '16px', letterSpacing: '2px', marginBottom: '10px' }}>
                                    {card.maskedCardNumber}
                                </p>
                                <p style={{ fontSize: '14px', opacity: '0.8' }}>
                                    Expires: {card.expirationDate.slice(0, 7)}
                                </p>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '10px',
                                gap: '10px'
                            }}>
                                <button
                                    onClick={() => handleEditCard(card)}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleShowDeleteModal(card.id)}
                                    style={{
                                        background: 'rgba(255, 0, 0, 0.7)',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        color: 'white',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showDeleteModal && (
                    <div
                        className="modal"
                        style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            animation: 'fadeIn 0.3s ease-in-out',
                        }}
                    >
                        <div
                            className="modal-content"
                            style={{
                                backgroundColor: 'white',
                                padding: '30px',
                                borderRadius: '12px',
                                textAlign: 'center',
                                width: '320px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <div style={{ marginBottom: '20px' }}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                                    alt="Warning"
                                    style={{ width: '50px', marginBottom: '15px' }}
                                />
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Confirm Deletion</p>
                                <p style={{ fontSize: '14px', color: '#555' }}>
                                    Are you sure you want to delete this card? This action cannot be undone.
                                </p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                <button
                                    onClick={() => handleDeleteCard(selectedCardId)}
                                    style={{
                                        padding: '10px 15px',
                                        backgroundColor: '#FF4D4F',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        flex: 1,
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    style={{
                                        padding: '10px 15px',
                                        backgroundColor: '#E0E0E0',
                                        color: '#333',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        flex: 1,
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{
                    marginTop: '15px'
                }}>
                    <h2>{cardToEdit ? 'Edit Card' : 'Add New Card'}</h2>
                </div>
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
                    <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 2 }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Expiration Date:</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <select
                                    name="expirationMonth"
                                    value={formData.expirationDate.split("-")[1] || ""}
                                    onChange={(e) => {
                                        const [year] = formData.expirationDate.split("-");
                                        const month = e.target.value;
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            expirationDate: `${year || ""}-${month}`,
                                        }));
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #CED4DA',
                                    }}
                                >
                                    <option value="">Month</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name="expirationYear"
                                    value={formData.expirationDate.split("-")[0] || ""}
                                    onChange={(e) => {
                                        const [, month] = formData.expirationDate.split("-");
                                        const year = e.target.value;
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            expirationDate: `${year}-${month || ""}`,
                                        }));
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        borderRadius: '4px',
                                        border: '1px solid #CED4DA',
                                    }}
                                >
                                    <option value="">Year</option>
                                    {Array.from({ length: 15 }, (_, i) => {
                                        const year = new Date().getFullYear() + i;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>CVC:</label>
                            <input
                                type="text"
                                name="cvc"
                                value={formData.cvc}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: '1px solid #CED4DA',
                                }}
                            />
                        </div>
                    </div>
                    <button type="submit" style={{
                        backgroundColor: '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        {cardToEdit ? 'Update Card' : 'Add Card'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default CreditCard;
