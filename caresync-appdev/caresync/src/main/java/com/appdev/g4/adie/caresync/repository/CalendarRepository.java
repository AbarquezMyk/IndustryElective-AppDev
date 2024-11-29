package com.appdev.g4.adie.caresync.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.Calendar;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    // Find calendars by doctor ID
    List<Calendar> findByDoctor_DoctorId(Long doctorId);

    // Check if a schedule exists for a doctor at a specific start and end time
    boolean existsByDoctor_DoctorIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(Long doctorId, LocalDateTime startTime, LocalDateTime endTime);

    // Find calendars that occur between two specific times
    List<Calendar> findByStartTimeBetween(LocalDateTime startTime, LocalDateTime endTime);
    
    // Optionally, find calendars by title
    List<Calendar> findByTitleContainingIgnoreCase(String title);
}