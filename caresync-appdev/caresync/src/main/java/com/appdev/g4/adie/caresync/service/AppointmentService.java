package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Appointment;
import com.appdev.g4.adie.caresync.entity.Doctor;
import com.appdev.g4.adie.caresync.repository.AppointmentRepository;
import com.appdev.g4.adie.caresync.repository.DoctorRepository;
import com.appdev.g4.adie.caresync.repository.UserRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    // Save appointment with doctor and user validation
    public Appointment saveAppointment(Appointment appointment) {
        // Ensure the doctor exists before saving the appointment
        Doctor doctor = doctorRepository.findById(appointment.getDoctor().getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        // Set the doctor on the appointment
        appointment.setDoctor(doctor);

        // If user information is part of the request, ensure user is also valid
        // Assuming the user is also sent as part of the appointment request
        userRepository.findById(appointment.getUser().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return appointmentRepository.save(appointment);
    }

    // Get appointment by ID
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Delete appointment
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    // Update appointment with doctor and user validation
    public Appointment updateAppointment(Long id, Appointment appointment) {
        return appointmentRepository.findById(id).map(existingAppointment -> {
            // Ensure the doctor exists before updating the appointment
            Doctor doctor = doctorRepository.findById(appointment.getDoctor().getDoctorId())
                    .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
            
            // Set the doctor on the appointment
            existingAppointment.setDoctor(doctor);

            // If user is part of the request, validate user
            userRepository.findById(appointment.getUser().getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Update the appointment details
            existingAppointment.setUser(appointment.getUser());
            existingAppointment.setAppointmentDateTime(appointment.getAppointmentDateTime());
            existingAppointment.setReason(appointment.getReason());

            return appointmentRepository.save(existingAppointment);
        }).orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }
}
