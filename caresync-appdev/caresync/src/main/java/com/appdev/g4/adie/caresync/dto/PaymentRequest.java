package com.appdev.g4.adie.caresync.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PaymentRequest {

    @NotNull(message = "Card ID is required.")
    private Long cardId;

    @NotNull(message = "User ID is required.")
    private Long userId; // Changed from 'id' to 'userId'

    @Min(value = 1, message = "Total amount must be greater than zero.")
    private double totalAmount;

    // Getters and Setters
    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
