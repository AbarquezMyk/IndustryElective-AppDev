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
import com.appdev.g4.adie.caresync.service.CardService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CardController {

    @Autowired
    private CardService cardService;

    @GetMapping("/cards")
    public List<Card> getAllCards() {
        return cardService.getAllCards();
    }

    @GetMapping("/cards/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) {
        return cardService.getCardById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add_card")
    public Card addCard(@RequestBody Card card) {
        return cardService.addCard(card);
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