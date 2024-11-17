package com.appdev.g4.adie.caresync.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.dto.PaymentRequest;
import com.appdev.g4.adie.caresync.entity.Card;
import com.appdev.g4.adie.caresync.entity.Payment;
import com.appdev.g4.adie.caresync.entity.PaymentStatus;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.repository.CardRepository;
import com.appdev.g4.adie.caresync.repository.PaymentRepository;
import com.appdev.g4.adie.caresync.repository.UserRepository;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> processPayment(@RequestBody PaymentRequest paymentRequest) {
        System.out.println("[INFO] Received payment request: " + paymentRequest);

        // Validate user ID
        Optional<User> optionalUser = userRepository.findById(paymentRequest.getUserId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        // Validate card existence
        Optional<Card> optionalCard = cardRepository.findById(paymentRequest.getCardId());
        if (optionalCard.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Card not found.");
        }

        Card card = optionalCard.get();
        User user = optionalUser.get();

        // Create and save the payment
        Payment payment = new Payment();
        payment.setCard(card);
        payment.setUser(user);
        payment.setTotalAmount(paymentRequest.getTotalAmount());
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setReceiptNumber(UUID.randomUUID().toString());

        try {
            paymentRepository.save(payment);
            System.out.println("[INFO] Payment saved successfully with receipt number: " + payment.getReceiptNumber());
            return ResponseEntity.ok("Payment completed successfully with receipt number: " + payment.getReceiptNumber());
        } catch (Exception e) {
            System.out.println("[ERROR] Failed to save payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save payment.");
        }
    }

    @GetMapping("/user/{userId}/history")
    public ResponseEntity<?> getPaymentHistoryByUserId(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            List<Payment> payments = paymentRepository.findByUser(userOptional.get());
            if (payments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No payment history found for user ID: " + userId);
            }

            return ResponseEntity.ok(payments);
        } catch (Exception e) {
            System.out.println("[ERROR] Failed to fetch payment history: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to load payment history.");
        }
    }
}
