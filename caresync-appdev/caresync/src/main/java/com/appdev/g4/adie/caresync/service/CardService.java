package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Card;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.repository.CardRepository;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public Optional<Card> getCardById(Long id) {
        return cardRepository.findById(id);
    }

    public Card addCard(Card card, User user) {
        card.setUser(user); // Associate card with user
        return cardRepository.save(card);
    }

    public Card updateCard(Long id, Card cardDetails) {
        return cardRepository.findById(id).map(card -> {
            card.setCardholderName(cardDetails.getCardholderName());
            card.setCardNumber(cardDetails.getCardNumber());
            card.setExpirationDate(cardDetails.getExpirationDate());
            card.setCvc(cardDetails.getCvc());
            return cardRepository.save(card);
        }).orElseThrow(() -> new RuntimeException("Card not found with id " + id));
    }

    public void deleteCard(Long id) {
        cardRepository.deleteById(id);
    }

    public List<Card> getCardsByUser(User user) {
        return cardRepository.findByUser(user); // Method to fetch cards by user
    }
}