package com.appdev.g4.adie.caresync.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appdev.g4.adie.caresync.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByLastName(String lastName); // New method to find patients by last name
}