package com.appdev.g4.adie.caresync.entity;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int age;
    private String gender;
    private String contactNumber;

    @ElementCollection
    @CollectionTable(name = "medical_conditions", joinColumns = @JoinColumn(name = "medical_history_id"))
    @Column(name = "condition")
    private List<String> conditions;

    private String otherCondition;

    @ElementCollection
    @CollectionTable(name = "current_symptoms", joinColumns = @JoinColumn(name = "medical_history_id"))
    @Column(name = "symptom")
    private List<String> symptoms;

    private String otherSymptom;

    private boolean takingMedication;
    private String medicationsList;

    private boolean medicationAllergies;
    private String allergiesList;

    private boolean tobaccoUse;
    private String tobaccoDetails;

    private boolean drugUse;
    private String drugDetails;

    private String alcoholConsumption;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public List<String> getConditions() {
        return conditions;
    }

    public void setConditions(List<String> conditions) {
        this.conditions = conditions;
    }

    public String getOtherCondition() {
        return otherCondition;
    }

    public void setOtherCondition(String otherCondition) {
        this.otherCondition = otherCondition;
    }

    public List<String> getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }

    public String getOtherSymptom() {
        return otherSymptom;
    }

    public void setOtherSymptom(String otherSymptom) {
        this.otherSymptom = otherSymptom;
    }

    public boolean isTakingMedication() {
        return takingMedication;
    }

    public void setTakingMedication(boolean takingMedication) {
        this.takingMedication = takingMedication;
    }

    public String getMedicationsList() {
        return medicationsList;
    }

    public void setMedicationsList(String medicationsList) {
        this.medicationsList = medicationsList;
    }

    public boolean isMedicationAllergies() {
        return medicationAllergies;
    }

    public void setMedicationAllergies(boolean medicationAllergies) {
        this.medicationAllergies = medicationAllergies;
    }

    public String getAllergiesList() {
        return allergiesList;
    }

    public void setAllergiesList(String allergiesList) {
        this.allergiesList = allergiesList;
    }

    public boolean isTobaccoUse() {
        return tobaccoUse;
    }

    public void setTobaccoUse(boolean tobaccoUse) {
        this.tobaccoUse = tobaccoUse;
    }

    public String getTobaccoDetails() {
        return tobaccoDetails;
    }

    public void setTobaccoDetails(String tobaccoDetails) {
        this.tobaccoDetails = tobaccoDetails;
    }

    public boolean isDrugUse() {
        return drugUse;
    }

    public void setDrugUse(boolean drugUse) {
        this.drugUse = drugUse;
    }

    public String getDrugDetails() {
        return drugDetails;
    }

    public void setDrugDetails(String drugDetails) {
        this.drugDetails = drugDetails;
    }

    public String getAlcoholConsumption() {
        return alcoholConsumption;
    }

    public void setAlcoholConsumption(String alcoholConsumption) {
        this.alcoholConsumption = alcoholConsumption;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
