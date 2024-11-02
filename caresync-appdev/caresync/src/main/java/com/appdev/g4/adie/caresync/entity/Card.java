package com.appdev.g4.adie.caresync.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cards")
public class Card {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Cardholder name cannot be null")
    private String cardholderName;

    @NotNull(message = "Card number cannot be null")
    @Pattern(regexp = "\\d{16}", message = "Card number must be 16 digits")
    private String cardNumber;

    @NotNull(message = "Expiration date cannot be null")
    private LocalDate expirationDate;

    @NotNull(message = "CVC cannot be null")
    @Size(min = 3, max = 4, message = "CVC must be 3 or 4 digits")
    private String cvc;

    private String maskedCardNumber;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardholderName() {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    // Set the card number and generate a masked version of it
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
        this.maskedCardNumber = maskCardNumber(cardNumber);
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }

    public String getMaskedCardNumber() {
        return maskedCardNumber;
    }

    public void setMaskedCardNumber(String maskedCardNumber) {
        this.maskedCardNumber = maskedCardNumber;
    }

    // Private helper method to mask the card number
    private String maskCardNumber(String cardNumber) {
        if (cardNumber != null && cardNumber.length() >= 4) {
            return "**** **** **** " + cardNumber.substring(cardNumber.length() - 4);
        }
        return null;
    }
}
