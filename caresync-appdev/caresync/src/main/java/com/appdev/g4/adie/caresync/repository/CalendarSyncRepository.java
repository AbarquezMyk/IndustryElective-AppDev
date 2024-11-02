package com.appdev.g4.adie.caresync.repository;

import com.appdev.g4.adie.caresync.entity.CalendarSync;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarSyncRepository extends JpaRepository<CalendarSync, Long> {

    // Custom query to find events by year, month, and day
    @Query("SELECT c FROM CalendarSync c WHERE YEAR(c.eventDate) = :year AND MONTH(c.eventDate) = :month AND DAY(c.eventDate) = :day")
    List<CalendarSync> findByYearAndMonthAndDay(@Param("year") int year, @Param("month") int month, @Param("day") int day);
}
