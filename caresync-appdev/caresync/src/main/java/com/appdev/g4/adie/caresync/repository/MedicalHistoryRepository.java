package com.appdev.g4.adie.caresync.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.MedicalHistory;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

    // Find all medical histories for a specific user
    List<MedicalHistory> findByUserUserId(Long userId);
}
