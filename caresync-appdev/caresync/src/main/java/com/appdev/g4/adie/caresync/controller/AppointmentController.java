package com.appdev.g4.adie.caresync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.Appointment;
import com.appdev.g4.adie.caresync.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/addAppointment")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PutMapping("/updateAppointment/{id}")
    public Appointment putAppointmentDetails(@PathVariable Long id, @RequestBody Appointment newAppointmentDetails) {
        return appointmentService.putAppointmentDetails(id, newAppointmentDetails);
    }

    @DeleteMapping("/deleteAppointment/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        return appointmentService.deleteAppointment(id);
    }
}