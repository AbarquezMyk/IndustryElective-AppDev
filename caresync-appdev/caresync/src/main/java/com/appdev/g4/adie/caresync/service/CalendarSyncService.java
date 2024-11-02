package com.appdev.g4.adie.caresync.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.CalendarSync;
import com.appdev.g4.adie.caresync.repository.CalendarSyncRepository;

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
        return calendarSyncRepository.findById(id).orElse(null);
    }

    // Create a new Calendar Sync
    public CalendarSync createCalendarSync(CalendarSync calendarSync) {
        return calendarSyncRepository.save(calendarSync);
    }

    // Update an existing Calendar Sync
    public CalendarSync updateCalendarSync(Long id, CalendarSync calendarSyncDetails) {
        // Implementation for updating an existing Calendar Sync
        CalendarSync calendarSync = calendarSyncRepository.findById(id).orElse(null);
        if (calendarSync != null) {
            // Update properties here
            // Example: calendarSync.setName(calendarSyncDetails.getName());
            return calendarSyncRepository.save(calendarSync);
        }
        return null;
    }

    // Delete a Calendar Sync by ID
    public void deleteCalendarSync(Long id) {
        calendarSyncRepository.deleteById(id);
    }

    // Get Calendar Syncs by year and month
    public List<CalendarSync> getCalendarSyncsByYearAndMonth(int year, int month) {
        return calendarSyncRepository.findByStartTimeYearAndStartTimeMonth(year, month);
    }
}
