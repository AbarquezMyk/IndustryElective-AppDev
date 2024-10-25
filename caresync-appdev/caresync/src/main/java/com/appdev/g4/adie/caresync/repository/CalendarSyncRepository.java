package com.appdev.g4.adie.caresync.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.CalendarSync;

@Repository
public interface CalendarSyncRepository extends JpaRepository<CalendarSync, Long> {
    // Additional query methods (if needed) can be defined here
}