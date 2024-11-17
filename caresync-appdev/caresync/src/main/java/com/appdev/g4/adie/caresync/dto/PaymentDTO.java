package com.appdev.g4.adie.caresync.dto;

import com.appdev.g4.adie.caresync.entity.Payment;

public class PaymentDTO {
    private String receiptNumber;
    private double totalAmount;
    private String status;
    private String createdAt;

    public PaymentDTO(Payment payment) {
        this.receiptNumber = payment.getReceiptNumber();
        this.totalAmount = payment.getTotalAmount();
        this.status = payment.getStatus().name();
        this.createdAt = payment.getCreatedAt().toString();  // Adjust format as needed
    }

    // Getters and setters
    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
