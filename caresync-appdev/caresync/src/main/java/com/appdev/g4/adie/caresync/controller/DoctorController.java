package com.appdev.g4.adie.caresync.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.appdev.g4.adie.caresync.entity.Doctor;
import com.appdev.g4.adie.caresync.entity.DoctorDepartment;
import com.appdev.g4.adie.caresync.service.DoctorDepartmentService;
import com.appdev.g4.adie.caresync.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private DoctorDepartmentService doctorDepartmentService;

    @PostMapping("/addDoctor")
    public ResponseEntity<Doctor> addDoctor(
        @RequestParam("name") String name,
        @RequestParam("email") String email,
        @RequestParam("phoneNumber") String phoneNumber,
        @RequestParam("specialization") Long specializationId, // Expecting ID of DoctorDepartment
        @RequestParam("amount") Double amount, // Expecting a Double
        @RequestParam("password") String password,
        @RequestParam(value = "file", required = false) MultipartFile file) {
    
        try {
            Doctor doctor = doctorService.addDoctor(name, email, phoneNumber, specializationId, amount, password, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(doctor);
        } catch (Exception e) {
            // Log the exception here (optional)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
        @PathVariable Long id,
        @RequestParam("name") String name,
        @RequestParam("email") String email,
        @RequestParam("phoneNumber") String phoneNumber,
        @RequestParam("specialization") Long specializationId, // Expecting ID of DoctorDepartment
        @RequestParam("amount") Double amount, // Expecting a Double
        @RequestParam("password") String password,
        @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Optional<Doctor> optionalDoctor = doctorService.findDoctorById(id);
        if (optionalDoctor.isPresent()) {
            Doctor doctor = optionalDoctor.get();
            doctor.setName(name);
            doctor.setEmail(email);
            doctor.setPhoneNumber(phoneNumber);
            
            // Fetch the DoctorDepartment using the ID
            DoctorDepartment specialty = doctorDepartmentService.findById(specializationId);
            doctor.setSpecialty(specialty);
            
            doctor.setAmount(amount);
            doctor.setPassword(password); // Limit this field as necessary

            // Handle the file upload if a file is provided
            if (file != null && !file.isEmpty()) {
                // Save the file and set the profile picture name or path
                String fileName = doctorService.storeFile(file); // Handle file storing
                doctor.setProfilePicture(fileName); // Save the filename
            }

            doctorService.saveDoctor(doctor); // Save the updated doctor
            return ResponseEntity.ok(doctor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        Optional<Doctor> optionalDoctor = doctorService.findDoctorById(id);
        if (optionalDoctor.isPresent()) {
            doctorService.deleteDoctor(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllDoctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        List<Doctor> doctors = doctorService.findAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        Optional<Doctor> doctor = doctorService.findDoctorById(id);
        return doctor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}