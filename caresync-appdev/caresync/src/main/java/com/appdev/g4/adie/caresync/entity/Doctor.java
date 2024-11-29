package com.appdev.g4.adie.caresync.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;

    private String name;
    private String email;
    private String phoneNumber;
    private Double amount;
    private String password; // Added password field
    private String profilePicture; // Field for profile picture URL or path

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}) 
    @JoinColumn(name = "department_id")
    private DoctorDepartment specialty; // Many-to-One relationship with DoctorDepartment

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference  // This will be serialized
    private List<Calendar> calendars = new ArrayList<>(); // To manage associated calendars

    // Other references (Review, Qualification, Appointment) can stay as they are if they are not circular
    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Appointment> appointments = new ArrayList<>();

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Qualification> qualifications = new ArrayList<>();

    // Methods to manage calendars
    public void addCalendar(Calendar calendar) {
        calendars.add(calendar);
        calendar.setDoctor(this); // Set back reference
    }

    public void removeCalendar(Calendar calendar) {
        calendars.remove(calendar);
        calendar.setDoctor(null); // Clear back reference
    }

    // Availability check through calendar integration
    public boolean isAvailable(LocalDateTime dateTime) {
        for (Calendar calendar : calendars) {
            if (calendar.getStartTime().isBefore(dateTime) && calendar.getEndTime().isAfter(dateTime)) {
                return false; // Not available
            }
        }
        return true; // Available
    }

    // Getters and Setters
    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public DoctorDepartment getSpecialty() {
        return specialty;
    }

    public void setSpecialty(DoctorDepartment specialty) {
        this.specialty = specialty;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Qualification> getQualifications() {
        return qualifications;
    }

    public void setQualifications(List<Qualification> qualifications) {
        this.qualifications = qualifications;
    }

    public List<Calendar> getCalendars() {
        return calendars;
    }

    public void setCalendars(List<Calendar> calendars) {
        this.calendars = calendars;
    }
}