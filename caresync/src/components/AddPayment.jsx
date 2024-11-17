import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPayment = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const totalAmount = 500; // Fixed payment amount
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get("/api/cards/getAllCards");
        console.log("Fetched cards:", response.data); // Debugging
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setMessage("Failed to load saved cards.");
      }
    };

    fetchCards();
  }, []);

  const handleCardSelection = (e) => {
    setSelectedCard(e.target.value);
    console.log("Selected card ID:", e.target.value); // Debugging
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCard) {
      setMessage("Please select a card to proceed.");
      return;
    }

    const email = localStorage.getItem("userEmail"); // Fetch logged-in user email
    if (!email) {
      setMessage("User email not found. Please log in.");
      return;
    }

    const paymentData = {
      cardId: selectedCard,
      totalAmount,
      status: "COMPLETED",
      email, // Use email instead of userId
    };

    console.log("Payment data being sent:", paymentData); // Debugging

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/payments", paymentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Optional token
        },
      });

      if (response.status === 200) {
        setMessage(response.data.message); // Display success message
        navigate("/payment-history"); // Redirect to payment history page
      } else {
        setMessage("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      const backendError = error.response?.data || "Payment failed. Please try again.";
      setMessage(typeof backendError === "object" ? backendError.message : backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#007BFF" }}>Make a Payment</h2>
      {message && (
        <p
          style={{
            color: typeof message === "string" && message.includes("successfully")
              ? "green"
              : "red",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <h3>Choose a Card:</h3>
          {cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #CED4DA",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  backgroundColor: selectedCard === card.id ? "#E9F7EF" : "#f0f0f0",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="selectedCard"
                  value={card.id}
                  checked={selectedCard === card.id}
                  onChange={handleCardSelection}
                  style={{ marginRight: "10px" }}
                />
                <div>
                  <p style={{ margin: "0", fontWeight: "bold" }}>
                    {card.cardholderName}
                  </p>
                  <p style={{ margin: "0", color: "#6C757D" }}>
                    **** **** **** {card.cardNumber.slice(-4)}
                  </p>
                  <p style={{ margin: "0", color: "#6C757D" }}>
                    Exp: {card.expirationDate.slice(0, 7)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No saved cards found. Please add a card to proceed.</p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>
            Total Amount:
          </label>
          <input
            type="number"
            value={totalAmount}
            readOnly
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #CED4DA",
              backgroundColor: "#E9ECEF",
              color: "#6C757D",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || cards.length === 0}
          style={{
            backgroundColor: loading ? "#ccc" : "#007BFF",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Processing..." : "Pay $500"}
        </button>
      </form>
    </div>
  );
};

export default AddPayment;
