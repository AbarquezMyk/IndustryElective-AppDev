package com.appdev.g4.adie.caresync.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.MedicalHistory;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.repository.MedicalHistoryRepository;
import com.appdev.g4.adie.caresync.repository.UserRepository;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<MedicalHistory> getAllMedicalHistories() {
        return medicalHistoryRepository.findAll();
    }

    public MedicalHistory getMedicalHistoryById(Long id) {
        return medicalHistoryRepository.findById(id).orElse(null);
    }

    public List<MedicalHistory> getMedicalHistoriesByUserId(Long userId) {
        return medicalHistoryRepository.findByUserUserId(userId);
    }

    public MedicalHistory saveMedicalHistory(Long userId, MedicalHistory medicalHistory) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        medicalHistory.setUser(user); // Associate the user with the medical history
        return medicalHistoryRepository.save(medicalHistory);
    }

    public void deleteMedicalHistory(Long id) {
        medicalHistoryRepository.deleteById(id);
    }
}
