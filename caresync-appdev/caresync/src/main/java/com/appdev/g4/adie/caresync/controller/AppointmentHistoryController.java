package com.appdev.g4.adie.caresync.controller;

import com.appdev.g4.adie.caresync.entity.AppointmentHistory;
import com.appdev.g4.adie.caresync.repository.AppointmentHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointment-history")
public class AppointmentHistoryController {

    @Autowired
    private AppointmentHistoryRepository appointmentHistoryRepository;

    @GetMapping
    public List<AppointmentHistory> getAllAppointmentHistories() {
        return appointmentHistoryRepository.findAll();
    }

    @PostMapping
    public AppointmentHistory createAppointmentHistory(@RequestBody AppointmentHistory appointmentHistory) {
        return appointmentHistoryRepository.save(appointmentHistory);
    }

    @GetMapping("/{id}")
    public AppointmentHistory getAppointmentHistoryById(@PathVariable Long id) {
        return appointmentHistoryRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public AppointmentHistory updateAppointmentHistory(@PathVariable Long id, @RequestBody AppointmentHistory historyDetails) {
        AppointmentHistory history = appointmentHistoryRepository.findById(id).orElse(null);
        if (history != null) {
            history.setHistoryDate(historyDetails.getHistoryDate());
            history.setReasons(historyDetails.getReasons());
            history.setStatus(historyDetails.getStatus());
            history.setResults(historyDetails.getResults());
            return appointmentHistoryRepository.save(history);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteAppointmentHistory(@PathVariable Long id) {
        appointmentHistoryRepository.deleteById(id);
    }
}