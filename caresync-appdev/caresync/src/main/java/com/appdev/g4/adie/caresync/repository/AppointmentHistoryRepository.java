package com.appdev.g4.adie.caresync.repository;

import com.appdev.g4.adie.caresync.entity.AppointmentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentHistoryRepository extends JpaRepository<AppointmentHistory, Long> {
}