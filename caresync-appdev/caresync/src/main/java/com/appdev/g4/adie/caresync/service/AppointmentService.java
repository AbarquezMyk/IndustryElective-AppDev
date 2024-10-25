package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Appointment;
import com.appdev.g4.adie.caresync.repository.AppointmentRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public String deleteAppointment(Long id) {
        String msg = " ";
        if (appointmentRepository.findById(id).isPresent()) {
            appointmentRepository.deleteById(id);
            msg = "Appointment Record has been deleted";
        }
        return msg;
    }

    @SuppressWarnings("finally")
    public Appointment putAppointmentDetails(Long id, Appointment newAppointmentDetails) {
        Appointment appointment = new Appointment();
        try {
            appointment = appointmentRepository.findById(id).get();
            appointment.setReason(newAppointmentDetails.getReason());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Appointment " + id + " not found");
        } finally {
            return appointmentRepository.save(appointment);
        }
    }
}