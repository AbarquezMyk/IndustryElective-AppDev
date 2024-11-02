package com.appdev.g4.adie.caresync.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "calendar_sync")
public class CalendarSync {

    public enum SyncStatus {
        PENDING, COMPLETED, FAILED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calendarId;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Sync status is required")
    private SyncStatus syncStatus;

    @Lob
    @NotBlank(message = "Sync data is required")
    private String syncData;

    @Lob
    private String eventDetails;

    // Commenting out the patient field for testing
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "patient_id", nullable = false)
    // private Patient patient;  // Assuming a Patient entity exists

    @NotNull(message = "Event date is required")
    @Temporal(TemporalType.TIMESTAMP)
    private Date eventDate;

    // New fields for year and month
    private int startTimeYear;
    private int startTimeMonth;

    // Constructors
    public CalendarSync() {
    }

    public CalendarSync(SyncStatus syncStatus, String syncData, String eventDetails, Date eventDate, int startTimeYear, int startTimeMonth) {
        this.syncStatus = syncStatus;
        this.syncData = syncData;
        this.eventDetails = eventDetails;
        // this.patient = patient; // Removed patient parameter from constructor
        this.eventDate = eventDate;
        this.startTimeYear = startTimeYear;
        this.startTimeMonth = startTimeMonth;
    }

    // Getters and setters
    public Long getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(Long calendarId) {
        this.calendarId = calendarId;
    }

    public SyncStatus getSyncStatus() {
        return syncStatus;
    }

    public void setSyncStatus(SyncStatus syncStatus) {
        this.syncStatus = syncStatus;
    }

    public String getSyncData() {
        return syncData;
    }

    public void setSyncData(String syncData) {
        this.syncData = syncData;
    }

    public String getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(String eventDetails) {
        this.eventDetails = eventDetails;
    }

    // Commented out the getter and setter for patient
    // public Patient getPatient() {
    //     return patient;
    // }

    // public void setPatient(Patient patient) {
    //     this.patient = patient;
    // }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public int getStartTimeYear() {
        return startTimeYear;
    }

    public void setStartTimeYear(int startTimeYear) {
        this.startTimeYear = startTimeYear;
    }

    public int getStartTimeMonth() {
        return startTimeMonth;
    }

    public void setStartTimeMonth(int startTimeMonth) {
        this.startTimeMonth = startTimeMonth;
    }
}
