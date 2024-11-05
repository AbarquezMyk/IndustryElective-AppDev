package com.appdev.g4.adie.caresync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.appdev.g4.adie.caresync.entity.CalendarSync;
import java.util.List;

@Repository
public interface CalendarSyncRepository extends JpaRepository<CalendarSync, Long> {
    
    // Custom query to find CalendarSyncs by year and month
    List<CalendarSync> findByStartTimeYearAndStartTimeMonth(int year, int month);
}
