package com.appdev.g4.adie.caresync.service;

import com.appdev.g4.adie.caresync.entity.AppointmentHistory;
import com.appdev.g4.adie.caresync.repository.AppointmentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentHistoryService {

    @Autowired
    private AppointmentHistoryRepository appointmentHistoryRepository;

    public List<AppointmentHistory> getAllAppointmentHistories() {
        return appointmentHistoryRepository.findAll();
    }

    public AppointmentHistory createAppointmentHistory(AppointmentHistory appointmentHistory) {
        return appointmentHistoryRepository.save(appointmentHistory);
    }

    public Optional<AppointmentHistory> getAppointmentHistoryById(Long id) {
        return appointmentHistoryRepository.findById(id);
    }

    public AppointmentHistory updateAppointmentHistory(Long id, AppointmentHistory historyDetails) {
        return appointmentHistoryRepository.findById(id)
            .map(history -> {
                history.setHistoryDate(historyDetails.getHistoryDate());
                history.setReasons(historyDetails.getReasons());
                history.setStatus(historyDetails.getStatus());
                history.setResults(historyDetails.getResults());
                return appointmentHistoryRepository.save(history);
            })
            .orElse(null);
    }

    public void deleteAppointmentHistory(Long id) {
        appointmentHistoryRepository.deleteById(id);
    }
}