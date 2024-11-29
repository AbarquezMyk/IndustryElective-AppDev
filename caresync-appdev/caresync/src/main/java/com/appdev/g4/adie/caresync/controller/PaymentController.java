package com.appdev.g4.adie.caresync.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.dto.PaymentDTO;
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
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Process a payment.
     */
    @PostMapping
    public ResponseEntity<String> processPayment(@RequestBody PaymentRequest paymentRequest) {
        System.out.println("[INFO] Received payment request: " + paymentRequest);

        // Validate user by username
        Optional<User> optionalUser = userRepository.findByUsername(paymentRequest.getUsername());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = optionalUser.get();

        // Validate card existence
        Optional<Card> optionalCard = cardRepository.findById(paymentRequest.getCardId());
        if (optionalCard.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Card not found.");
        }

        Card card = optionalCard.get();

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
            System.err.println("[ERROR] Failed to save payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save payment.");
        }
    }

    /**
     * Fetch payment history by user email.
     */
    @GetMapping("/user/{email}/history")
    public ResponseEntity<?> getPaymentHistoryByEmail(@PathVariable String email) {
        try {
            // Validate user by email
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }

            User user = optionalUser.get();

            // Fetch payments by user
            List<Payment> payments = paymentRepository.findByUser(user);
            if (payments.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No payment history found for email: " + email);
            }

            // Initialize lazy-loaded properties (e.g., user or card information)
            payments.forEach(payment -> {
                Hibernate.initialize(payment.getUser());
                Hibernate.initialize(payment.getCard());
            });

            // Convert Payments to DTOs
            List<PaymentDTO> paymentDTOs = payments.stream()
                    .map(PaymentDTO::new)  // Convert to DTOs
                    .collect(Collectors.toList());

            return ResponseEntity.ok(paymentDTOs);
        } catch (Exception e) {
            System.err.println("[ERROR] Failed to load payment history: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to load payment history.");
        }
    }
}
