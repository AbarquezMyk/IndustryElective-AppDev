package com.appdev.g4.adie.caresync.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Appointment;
import com.appdev.g4.adie.caresync.entity.Calendar;
import com.appdev.g4.adie.caresync.repository.AppointmentRepository;
import com.appdev.g4.adie.caresync.repository.CalendarRepository;

@Service
public class CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Method to get appointments by doctor Id
    public List<Appointment> getAppointments(Long doctorId) {
        return appointmentRepository.findByDoctor_DoctorId(doctorId);
    }

    // Create a new calendar entry
    public Calendar createCalendarEntry(Calendar calendar) {
        return calendarRepository.save(calendar);
    }

    // Update an existing calendar entry
    public Calendar updateCalendarEntry(Long id, Calendar calendarDetails) {
        Calendar calendar = calendarRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Calendar entry not found with id " + id));

        calendar.setTitle(calendarDetails.getTitle());
        calendar.setStartTime(calendarDetails.getStartTime());
        calendar.setEndTime(calendarDetails.getEndTime());
        calendar.setDayOfWeek(calendarDetails.getDayOfWeek());
        calendar.setDoctor(calendarDetails.getDoctor());

        return calendarRepository.save(calendar);
    }

    // Delete a calendar entry
    public void deleteCalendarEntry(Long id) {
        if (!calendarRepository.existsById(id)) {
            throw new RuntimeException("Calendar entry not found with id " + id);
        }
        calendarRepository.deleteById(id);
    }

    // Get all calendar entries for a specific doctor
    public List<Calendar> getCalendarEntriesByDoctorId(Long doctorId) {
        return calendarRepository.findByDoctor_DoctorId(doctorId);
    }

    // Check if a schedule exists for a doctor at a specific date and time
    public boolean scheduleExists(Long doctorId, LocalDateTime startTime, LocalDateTime endTime) {
        return calendarRepository.existsByDoctor_DoctorIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                doctorId, 
                startTime, 
                endTime
        );
    }

    // Get a specific calendar entry by ID
    public Optional<Calendar> getCalendarEntryById(Long id) {
        return calendarRepository.findById(id);
    }

}