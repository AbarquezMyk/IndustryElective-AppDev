package com.appdev.g4.adie.caresync.controller;


import java.util.List;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.DoctorEntity;
import com.appdev.g4.adie.caresync.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/postDoctor")
    public DoctorEntity createDoctor(@RequestBody DoctorEntity doctor) {
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping
    public List<DoctorEntity> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    
    @PutMapping("/putDoctor")
    public DoctorEntity updateDoctor(@RequestParam Long doctorId, @RequestBody DoctorEntity newDoctor) throws NameNotFoundException {
        return doctorService.updateDoctor(doctorId, newDoctor);
    }

    
    @DeleteMapping("/deleteDoctor/{doctorId}")
    public String deleteDoctor(@PathVariable Long doctorId) {
        return doctorService.deleteDoctor(doctorId);
    }
}
