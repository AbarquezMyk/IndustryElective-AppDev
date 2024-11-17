package com.appdev.g4.adie.caresync.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.appdev.g4.adie.caresync.entity.Payment;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.repository.PaymentRepository;
import com.appdev.g4.adie.caresync.repository.UserRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }

    // Save a new payment
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Retrieve all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Delete a payment by ID
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found with ID: " + id);
        }
        paymentRepository.deleteById(id);
    }

    // Update payment details
    public Payment putPaymentDetails(Long id, Payment newPaymentDetails) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setTotalAmount(newPaymentDetails.getTotalAmount());
            payment.setStatus(newPaymentDetails.getStatus());
            payment.setReceiptNumber(newPaymentDetails.getReceiptNumber());
            return paymentRepository.save(payment);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found with ID: " + id));
    }

    // Retrieve payments by user ID
    public List<Payment> getPaymentsByUserId(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + userId));
        return paymentRepository.findByUser(user);
    }
}
