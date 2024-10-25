package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Payment;
import com.appdev.g4.adie.caresync.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public String deletePayment(Long id) {
        String msg = " ";
        if (paymentRepository.findById(id).isPresent()) {
            paymentRepository.deleteById(id);
            msg = "Payment Record has been deleted";
        }
        return msg;
    }

    @SuppressWarnings("finally")
    public Payment putPaymentDetails(Long id, Payment newPaymentDetails) {
        Payment payment = new Payment();
        try {
            payment = paymentRepository.findById(id).get();
            payment.setTotalAmount(newPaymentDetails.getTotalAmount());
            payment.setStatus(newPaymentDetails.getStatus());
            payment.setReceiptNumber(newPaymentDetails.getReceiptNumber());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Payment " + id + " not found");
        } finally {
            return paymentRepository.save(payment);
        }
    }
}