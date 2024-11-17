import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get("/api/payments/user/1/history"); // Replace 1 with dynamic user ID
        setPayments(response.data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setError("Failed to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (loading) return <p>Loading payment history...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#007BFF" }}>Payment History</h2>
      {payments.length === 0 ? (
        <p>No payment history found.</p>
      ) : (
        <ul>
          {payments.map((payment) => (
            <li key={payment.paymentId} style={{ marginBottom: "15px" }}>
              <p><strong>Receipt:</strong> {payment.receiptNumber}</p>
              <p><strong>Amount:</strong> ${payment.totalAmount}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;
