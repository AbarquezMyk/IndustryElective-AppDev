package com.appdev.g4.adie.caresync.dto;

public class PaymentRequest {
    private Long cardId;
    private Double totalAmount;
    private String username; // Add this field

    // Getters and Setters
    public Long getCardId() {
        return cardId;
    }

    public void setCardId(Long cardId) {
        this.cardId = cardId;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getUsername() { // Add getter
        return username;
    }

    public void setUsername(String username) { // Add setter
        this.username = username;
    }
}
