package com.appdev.g4.adie.caresync.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.appdev.g4.adie.caresync.entity.Calendar;
import com.appdev.g4.adie.caresync.entity.Doctor;
import com.appdev.g4.adie.caresync.entity.DoctorDepartment;
import com.appdev.g4.adie.caresync.repository.CalendarRepository;
import com.appdev.g4.adie.caresync.repository.DoctorDepartmentRepository;
import com.appdev.g4.adie.caresync.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorDepartmentRepository departmentRepository;

    @Autowired
    private CalendarRepository calendarIntegrationRepository;

    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> findDoctorById(Long doctorId) {
        return doctorRepository.findById(doctorId);
    }

    public Doctor findDoctorByName(String name) {
        return doctorRepository.findByName(name);
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    // Handle saving new doctor along with profile picture
    public Doctor addDoctor(
        String name, String email, String phoneNumber, 
        Long specializationId, Double amount, String password, MultipartFile file) throws IOException {
        
        Doctor doctor = new Doctor();
        doctor.setName(name);
        doctor.setEmail(email);
        doctor.setPhoneNumber(phoneNumber);
        
        // Fetch the DoctorDepartment using the ID and set it
        DoctorDepartment department = departmentRepository.findById(specializationId)
            .orElseThrow(() -> new RuntimeException("Specialization not found"));
        doctor.setSpecialty(department);

        // Setting amount and password
        doctor.setAmount(amount);
        doctor.setPassword(password);

        // Handle file upload
        if (file != null && !file.isEmpty()) {
            String fileName = storeFile(file);
            doctor.setProfilePicture(fileName);
        }

        return doctorRepository.save(doctor);
    }

    // Storing file logic
    public String storeFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename(); // Unique file name
        Path filePath = Paths.get("uploads/" + fileName);
        Files.createDirectories(filePath.getParent()); // Ensure the upload directory exists
        Files.copy(file.getInputStream(), filePath);
        return fileName;
    }

    public boolean checkDoctorAvailability(Long doctorId, String dateTime) {
        Optional<Doctor> optionalDoctor = doctorRepository.findById(doctorId);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            List<Calendar> integrations = calendarIntegrationRepository.findByDoctor_DoctorId(doctor.getDoctorId());
            // Check availability logic here...
            return true; // Replace with actual availability check logic
        } else {
            return false; // Doctor not found
        }
    }

    public List<Doctor> findDoctorsByDepartmentId(Long departmentId) {
        return doctorRepository.findBySpecialty_DepartmentId(departmentId);
    }
}