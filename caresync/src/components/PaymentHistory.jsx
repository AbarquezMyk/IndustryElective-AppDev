import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      setError("");

      try {
        // Retrieve the user email from localStorage
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
          throw new Error("User not logged in.");
        }

        // Call the API with the email
        const response = await axios.get(
          `http://localhost:8080/api/payments/user/${userEmail}/history`
        );

        setPayments(response.data);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load payment history."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#1976d2" }}>
        Payment History
      </Typography>
      {payments.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No payment history found.
        </Typography>
      ) : (
        <Box>
          {payments.map((payment) => (
            <Card variant="outlined" sx={{ boxShadow: 3, marginBottom: 3 }} key={payment.paymentId}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  Receipt: {payment.receiptNumber}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  <strong>Amount:</strong> ${payment.totalAmount}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {payment.status}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PaymentHistory;
