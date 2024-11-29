package com.appdev.g4.adie.caresync.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Find appointments by user ID
    List<Appointment> findByUser_UserId(Long userId);

    // Find appointments by doctor ID
    List<Appointment> findByDoctor_DoctorId(Long doctorId);
}