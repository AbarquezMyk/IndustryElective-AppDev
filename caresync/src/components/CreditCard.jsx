import React, { useState, useEffect } from 'react';
import './css/theme.css'; // Assuming this contains your styles
import axios from 'axios'; // Import Axios directly

const CreditCard = ({ userId }) => {
    const [cards, setCards] = useState([]);
    const [cardToEdit, setCardToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const [formData, setFormData] = useState({
        cardholderName: '',
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
        expirationDate: '',
        cvc: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwt'); // Retrieve token from local storage

            if (!userId) {
                console.error("User ID is not provided or is invalid.");
                return;
            }

            try {
                const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}/cards`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCards(userResponse.data);
            } catch (error) {
                console.error("There was an error fetching the cards!", error);
            }
        };

        fetchData();
    }, [userId]); // Fetch data whenever userId changes

    const handleDeleteCard = async (cardId) => {
        const token = localStorage.getItem('jwt'); // Retrieve token from local storage

        try {
            await axios.delete(`http://localhost:8080/api/cards/delete_card/${cardId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCards(cards.filter(card => card.id !== cardId));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting card", error);
            alert("Failed to delete card. Please try again.");
        }
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
            expirationMonth: card.expirationDate ? card.expirationDate.slice(5, 7) : '',
            expirationYear: card.expirationDate ? card.expirationDate.slice(0, 4) : '',
            expirationDate: card.expirationDate ? card.expirationDate.slice(0, 7) : '',
            cvc: card.cvc
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwt'); // Retrieve token from local storage
        
        if (!userId) {
            alert("Invalid user ID, please log in again.");
            return;
        }
    
        const url = cardToEdit ? 
            `http://localhost:8080/api/cards/edit_card/${cardToEdit.id}` : 
            `http://localhost:8080/api/cards/add_card/${userId}`;
    
        const data = {
            cardholderName: formData.cardholderName,
            cardNumber: formData.cardNumber,
            expirationDate: formData.expirationDate ? `${formData.expirationDate}-01` : '', // Assuming the last day of the month
            cvc: formData.cvc
        };
    
        try {
            const response = await axios.post(url, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (cardToEdit) {
                setCards(cards.map(card => (
                    card.id === cardToEdit.id
                        ? { ...card, ...response.data, expirationDate: response.data.expirationDate.slice(0, 7) }
                        : card
                )));
            } else {
                setCards([...cards, { ...response.data, expirationDate: response.data.expirationDate.slice(0, 7) }]);
            }

            resetForm();
            alert("Card saved successfully!");
        } catch (error) {
            console.error("Error saving card", error);
            alert("Failed to save card. Please try again.");
        }
    };

    const resetForm = () => {
        setFormData({
            cardholderName: '',
            cardNumber: '',
            expirationMonth: '',
            expirationYear: '',
            expirationDate: '',
            cvc: ''
        });
        setCardToEdit(null);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => {
            const updatedForm = { ...prevState, [name]: value };
            if (name === "expirationMonth" || name === "expirationYear") {
                updatedForm.expirationDate = `${updatedForm.expirationYear || ""}-${updatedForm.expirationMonth || ""}`;
            }
            return updatedForm;
        });
    };

    return (
        <div style={styles.container}>
            <main style={styles.main}>
                <h1 style={styles.title}>Payment Settings</h1>

                <h2 style={styles.subtitle}>Saved Cards</h2>
                <div style={styles.cardGrid}>
                    {cards.length > 0 ? cards.map(card => (
                        <div key={card.id} style={styles.card}>
                            <p style={styles.cardTitle}>{card.cardholderName}</p>
                            <p style={styles.cardNumber}>{card.maskedCardNumber}</p>
                            <p style={styles.cardExpiration}>
                                Expires: {card.expirationDate ? card.expirationDate.slice(0, 7) : 'Not available'}
                            </p>
                            <div style={styles.buttonGroup}>
                                <button onClick={() => handleEditCard(card)} style={styles.editButton}>Edit</button>
                                <button onClick={() => handleShowDeleteModal(card.id)} style={styles.deleteButton}>Delete</button>
                            </div>
                        </div>
                    )) : (
                        <p>No cards available</p>
                    )}
                </div>

                {showDeleteModal && (
                    <div className="modal" style={styles.modal}>
                        <div className="modal-content" style={styles.modalContent}>
                            <p>Are you sure you want to delete this card?</p>
                            <button onClick={() => handleDeleteCard(selectedCardId)} style={styles.confirmButton}>Confirm</button>
                            <button onClick={() => setShowDeleteModal(false)} style={styles.cancelButton}>Cancel</button>
                        </div>
                    </div>
                )}

                <h2 style={styles.subtitle}>{cardToEdit ? 'Edit Card' : 'Add New Card'}</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleChange} placeholder="Cardholder Name" required style={styles.input} />
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="Card Number" required style={styles.input} />
                    <div style={styles.row}>
                        <select
                            name="expirationMonth"
                            value={formData.expirationMonth}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        >
                            <option value="" disabled>Month</option>
                                {[
                                    "January", "February", "March", "April", "May", "June",
                                    "July", "August", "September", "October", "November", "December"
                                ].map((month, index) => (
                                    <option key={index + 1} value={(index + 1).toString().padStart(2, '0')}>
                                        {month}
                                    </option>
                                ))}
                        </select>
                        <select
                            name="expirationYear"
                            value={formData.expirationYear}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        >
                            <option value="" disabled>Year</option>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i} value={(new Date().getFullYear() + i).toString()}>
                                    {new Date().getFullYear() + i}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} placeholder="CVC" required style={styles.input} />
                    <button type="submit" style={styles.submitButton}>{cardToEdit ? 'Update Card' : 'Add Card'}</button>
                </form>
            </main>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
    },
    main: {
        padding: '20px',
        backgroundColor: '#F8F9FA',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: '32px',
        color: '#023350',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '24px',
        margin: '20px 0',
        color: '#023350',
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    card: {
        background: 'linear-gradient(135deg, #007BFF, #0056b3)',
        borderRadius: '12px',
        padding: '20px',
        color: 'white',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    },
    cardTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
    },
    cardNumber: {
        fontSize: '16px',
        letterSpacing: '2px',
        marginBottom: '10px',
    },
    cardExpiration: {
        fontSize: '14px',
        opacity: '0.8',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    editButton: {
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        flex: 1,
        marginRight: '5px',
    },
    deleteButton: {
        background: 'rgba(255, 0, 0, 0.7)',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        flex: 1,
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        textAlign: 'center',
        width: '320px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    confirmButton: {
        padding: '10px 15px',
        backgroundColor: '#FF4D4F',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    cancelButton: {
        padding: '10px 15px',
        backgroundColor: '#E0E0E0',
        color: '#333',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    form: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #CED4DA',
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    row: {
        display: 'flex',
        gap: '10px'
    }
};

export default CreditCard;