package com.appdev.g4.adie.caresync.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.Appointment;
import com.appdev.g4.adie.caresync.entity.Calendar;
import com.appdev.g4.adie.caresync.service.CalendarService;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "http://localhost:3000") // Add this for React frontend
public class CalendarController {
    private final CalendarService calendarService;

    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    @GetMapping("/appointments/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointments(@PathVariable Long doctorId) {
        List<Appointment> appointments = calendarService.getAppointments(doctorId);
        
        if (appointments.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // No appointments found
        }

        return ResponseEntity.ok(appointments);
    }

    @PostMapping("/schedule")
    public ResponseEntity<?> addSchedule(@RequestBody Calendar calendar, @RequestParam(required = false) boolean isFromAppointment) {
        try {
            // Validate input
            if (calendar.getStartTime() == null || calendar.getEndTime() == null) {
                return ResponseEntity.badRequest().body("Start time and end time are required");
            }

            if (calendar.getStartTime().isAfter(calendar.getEndTime())) {
                return ResponseEntity.badRequest().body("Start time must be before end time");
            }

            // Check if the schedule is linked to an appointment
            if (isFromAppointment) {
                if (calendar.getDoctor() == null || calendar.getDoctor().getDoctorId() == null) {
                    return ResponseEntity.badRequest().body("Doctor ID is required for schedules linked to appointments");
                }
            } else {
                // Ensure `doctor` is null for user-added schedules
                calendar.setDoctor(null);
            }

            Calendar savedSchedule = calendarService.createCalendarEntry(calendar);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedSchedule);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error adding schedule: " + e.getMessage());
        }
    }


    @PutMapping("/schedule/{id}")
    public ResponseEntity<?> updateSchedule(@PathVariable Long id, @RequestBody Calendar calendarDetails) {
        try {
            Calendar updatedSchedule = calendarService.updateCalendarEntry(id, calendarDetails);
            return ResponseEntity.ok(updatedSchedule);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Schedule not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error updating schedule: " + e.getMessage());
        }
    }

    @DeleteMapping("/schedule/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        try {
            calendarService.deleteCalendarEntry(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Schedule not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting schedule: " + e.getMessage());
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Calendar>> getCalendarByDoctorId(@PathVariable Long doctorId) {
        List<Calendar> calendars = calendarService.getCalendarEntriesByDoctorId(doctorId);
        return ResponseEntity.ok(calendars);
    }

    @GetMapping("/schedule/{id}")
    public ResponseEntity<?> getScheduleById(@PathVariable Long id) {
        Optional<Calendar> calendar = calendarService.getCalendarEntryById(id);
        return calendar.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }
}