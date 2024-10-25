package com.appdev.g4.adie.caresync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.CalendarSync;
import com.appdev.g4.adie.caresync.service.CalendarSyncService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/calendar-sync")
public class CalendarSyncController {

    @Autowired
    private CalendarSyncService calendarSyncService;

    // Get all Calendar Syncs
    @GetMapping
    public List<CalendarSync> getAllCalendarSyncs() {
        return calendarSyncService.getAllCalendarSyncs();
    }

    // Get a specific Calendar Sync by ID
    @GetMapping("/{id}")
    public ResponseEntity<CalendarSync> getCalendarSyncById(@PathVariable Long id) {
        CalendarSync calendarSync = calendarSyncService.getCalendarSyncById(id);
        if (calendarSync != null) {
            return ResponseEntity.ok(calendarSync);
        }
        return ResponseEntity.notFound().build();
    }

    // Create a new Calendar Sync
    @PostMapping
    public ResponseEntity<CalendarSync> createCalendarSync(@RequestBody CalendarSync calendarSync) {
        CalendarSync createdCalendarSync = calendarSyncService.createCalendarSync(calendarSync);
        return ResponseEntity.ok(createdCalendarSync);
    }


    // Update an existing Calendar Sync
    @PutMapping("/{id}")
    public ResponseEntity<CalendarSync> updateCalendarSync(@PathVariable Long id, @Valid @RequestBody CalendarSync calendarSyncDetails) {
        CalendarSync updatedCalendarSync = calendarSyncService.updateCalendarSync(id, calendarSyncDetails);
        if (updatedCalendarSync != null) {
            return ResponseEntity.ok(updatedCalendarSync);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a Calendar Sync by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendarSync(@PathVariable Long id) {
        calendarSyncService.deleteCalendarSync(id);
        return ResponseEntity.noContent().build();
    }
}
