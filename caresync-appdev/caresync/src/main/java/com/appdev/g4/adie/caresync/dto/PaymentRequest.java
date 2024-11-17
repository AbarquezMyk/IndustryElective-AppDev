package com.appdev.g4.adie.caresync.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PaymentRequest {

    @NotNull(message = "Card ID is required.")
    private Long cardId;

    @NotNull(message = "Email is required.")
    @Email(message = "Invalid email format.")
    private String email; // Replacing userId with email

    @Min(value = 1, message = "Total amount must be greater than zero.")
    private double totalAmount;

    // Getters and Setters
    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
