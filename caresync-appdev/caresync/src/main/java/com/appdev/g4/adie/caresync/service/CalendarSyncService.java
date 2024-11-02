package com.appdev.g4.adie.caresync.service;

import com.appdev.g4.adie.caresync.entity.CalendarSync;
import com.appdev.g4.adie.caresync.repository.CalendarSyncRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalendarSyncService {

    @Autowired
    private CalendarSyncRepository calendarSyncRepository;

    // Get all Calendar Syncs
    public List<CalendarSync> getAllCalendarSyncs() {
        return calendarSyncRepository.findAll();
    }

    // Get a specific Calendar Sync by ID
    public CalendarSync getCalendarSyncById(Long id) {
        Optional<CalendarSync> calendarSync = calendarSyncRepository.findById(id);
        return calendarSync.orElse(null);
    }

    // Create a new Calendar Sync
    public CalendarSync createCalendarSync(CalendarSync calendarSync) {
        return calendarSyncRepository.save(calendarSync);
    }

    // Update an existing Calendar Sync
    public CalendarSync updateCalendarSync(Long id, CalendarSync calendarSyncDetails) {
        CalendarSync existingCalendarSync = getCalendarSyncById(id);
        if (existingCalendarSync != null) {
            existingCalendarSync.setSyncStatus(calendarSyncDetails.getSyncStatus());
            existingCalendarSync.setSyncData(calendarSyncDetails.getSyncData());
            existingCalendarSync.setEventDetails(calendarSyncDetails.getEventDetails());
            existingCalendarSync.setPatientId(calendarSyncDetails.getPatientId());
            return calendarSyncRepository.save(existingCalendarSync);
        }
        return null;
    }

    // Delete a Calendar Sync by ID
    public void deleteCalendarSync(Long id) {
        calendarSyncRepository.deleteById(id);
    }

    // Get Calendar Syncs by specific date
    public List<CalendarSync> getCalendarSyncsByDate(int year, int month, int day) {
        return calendarSyncRepository.findByYearAndMonthAndDay(year, month, day);
    }
}
