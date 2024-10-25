package com.appdev.g4.adie.caresync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.g4.adie.caresync.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}