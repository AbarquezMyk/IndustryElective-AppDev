package com.appdev.g4.adie.caresync.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.Payment;
import com.appdev.g4.adie.caresync.entity.User;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUser(User user); // Query payments by User entity
}
