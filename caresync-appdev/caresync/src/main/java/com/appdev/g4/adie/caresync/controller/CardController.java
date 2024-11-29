package com.appdev.g4.adie.caresync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.Card;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.service.CardService;
import com.appdev.g4.adie.caresync.service.UserService;

@RestController
@RequestMapping("/api/cards")
@CrossOrigin(origins = "http://localhost:3000")
public class CardController {

    @Autowired
    private CardService cardService;

    @Autowired
    private UserService userService; // To handle User context

    @GetMapping("/getAllCards")
    public List<Card> getAllCards() {
        return cardService.getAllCards();
    }

    @GetMapping("/getAllCards/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        return cardService.getCardById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add_card/{userId}")
    public ResponseEntity<Card> addCard(@PathVariable Long userId, @RequestBody Card card) {
        User user = userService.findUserById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Card addedCard = cardService.addCard(card, user); // Associate card with user
        return ResponseEntity.ok(addedCard);
    }

    @PostMapping("/edit_card/{id}")
    public ResponseEntity<Card> updateCard(@PathVariable Long id, @RequestBody Card card) {
        return ResponseEntity.ok(cardService.updateCard(id, card));
    }

    @DeleteMapping("/delete_card/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.noContent().build();
    }
}