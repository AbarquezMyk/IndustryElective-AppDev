package com.appdev.g4.adie.caresync.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctor")
public class DoctorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    private String doctorName;
    private String contactInformation;
    private String status;
    private String location;
    private String department; // New department attribute

    public DoctorEntity() {
    }

    public DoctorEntity(String doctorName, String contactInformation, String status, String location, String department) {
        this.doctorName = doctorName;
        this.contactInformation = contactInformation;
        this.status = status;
        this.location = location;
        this.department = department;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getContactInformation() {
        return contactInformation;
    }

    public void setContactInformation(String contactInformation) {
        this.contactInformation = contactInformation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDepartment() { // Getter for department
        return department;
    }

    public void setDepartment(String department) { // Setter for department
        this.department = department;
    }
}
