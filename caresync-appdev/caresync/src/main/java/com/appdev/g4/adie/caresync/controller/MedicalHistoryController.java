package com.appdev.g4.adie.caresync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.MedicalHistory;
import com.appdev.g4.adie.caresync.service.MedicalHistoryService;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @GetMapping
    public List<MedicalHistory> getAllMedicalHistories() {
        return medicalHistoryService.getAllMedicalHistories();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistory> getMedicalHistoryById(@PathVariable Long id) {
        MedicalHistory medicalHistory = medicalHistoryService.getMedicalHistoryById(id);
        if (medicalHistory != null) {
            return ResponseEntity.ok(medicalHistory);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/{userId}")
    public List<MedicalHistory> getMedicalHistoriesByUserId(@PathVariable Long userId) {
        return medicalHistoryService.getMedicalHistoriesByUserId(userId);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<MedicalHistory> createMedicalHistory(@PathVariable Long userId, @RequestBody MedicalHistory medicalHistory) {
        try {
            MedicalHistory savedMedicalHistory = medicalHistoryService.saveMedicalHistory(userId, medicalHistory);
            return ResponseEntity.ok(savedMedicalHistory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        medicalHistoryService.deleteMedicalHistory(id);
        return ResponseEntity.noContent().build();
    }
}
