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

    public List<CalendarSync> getAllCalendarSyncs() {
        return calendarSyncRepository.findAll();
    }

    public CalendarSync getCalendarSyncById(Long id) {
        return calendarSyncRepository.findById(id).orElse(null);
    }

    public CalendarSync createCalendarSync(CalendarSync calendarSync) {
        return calendarSyncRepository.save(calendarSync);
    }

    public CalendarSync updateCalendarSync(Long id, CalendarSync calendarSyncDetails) {
        CalendarSync calendarSync = calendarSyncRepository.findById(id).orElse(null);
        if (calendarSync != null) {
            // Update the calendar sync fields with the new details
            calendarSync.setSyncStatus(calendarSyncDetails.getSyncStatus());
            calendarSync.setSyncData(calendarSyncDetails.getSyncData());
            calendarSync.setEventDetails(calendarSyncDetails.getEventDetails());
            calendarSync.setPatientId(calendarSyncDetails.getPatientId());
            return calendarSyncRepository.save(calendarSync);
        }
        return null;
    }

    public void deleteCalendarSync(Long id) {
        calendarSyncRepository.deleteById(id);
    }
}
