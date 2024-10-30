package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Patient;
import com.appdev.g4.adie.caresync.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient createPatient(Patient patient) {
        // Add basic validation (could be enhanced)
        if (patient.getFirstName() == null || patient.getLastName() == null) {
            throw new IllegalArgumentException("First name and last name are required.");
        }
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient patientDetails) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id " + id));

        patient.setFirstName(patientDetails.getFirstName());
        patient.setLastName(patientDetails.getLastName());
        patient.setSex(patientDetails.getSex());
        patient.setBirthdate(patientDetails.getBirthdate());
        patient.setPhone(patientDetails.getPhone());
        patient.setEmail(patientDetails.getEmail());
        patient.setAddress(patientDetails.getAddress());
        patient.setAllergies(patientDetails.getAllergies());
        patient.setMedicalHistory(patientDetails.getMedicalHistory());
        patient.setCurrentMedicals(patientDetails.getCurrentMedicals());
        patient.setImmunizationRecords(patientDetails.getImmunizationRecords());
        patient.setFamilyMedicalHistory(patientDetails.getFamilyMedicalHistory());
        patient.setNextOfKin(patientDetails.getNextOfKin());
        patient.setContactInformation(patientDetails.getContactInformation());
        patient.setSecondaryContact(patientDetails.getSecondaryContact());
        patient.setSecondaryContactInformation(patientDetails.getSecondaryContactInformation());
        patient.setSpecialInstructions(patientDetails.getSpecialInstructions());

        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}