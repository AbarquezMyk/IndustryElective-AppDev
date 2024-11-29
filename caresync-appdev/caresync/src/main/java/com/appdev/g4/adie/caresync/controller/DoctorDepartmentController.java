package com.appdev.g4.adie.caresync.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.Doctor;
import com.appdev.g4.adie.caresync.entity.DoctorDepartment;
import com.appdev.g4.adie.caresync.service.DoctorDepartmentService;
import com.appdev.g4.adie.caresync.service.DoctorService;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorDepartmentController {

    @Autowired
    private DoctorDepartmentService doctorDepartmentService;

    @Autowired
    private DoctorService doctorService; 

    @GetMapping
    public ResponseEntity<List<DoctorDepartment>> getAllDepartments() {
        return ResponseEntity.ok(doctorDepartmentService.getAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDepartment> getDepartmentById(@PathVariable Long id) {
        DoctorDepartment department = doctorDepartmentService.getDepartmentById(id);
        return department != null ? ResponseEntity.ok(department) : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<DoctorDepartment> createDepartment(@RequestBody DoctorDepartment doctorDepartment) {
        DoctorDepartment createdDepartment = doctorDepartmentService.createDepartment(doctorDepartment);
        return ResponseEntity.ok(createdDepartment);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DoctorDepartment> updateDepartment(@PathVariable Long id, @RequestBody DoctorDepartment updatedDepartment) {
        DoctorDepartment department = doctorDepartmentService.updateDepartment(id, updatedDepartment);
        return department != null ? ResponseEntity.ok(department) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        boolean deleted = doctorDepartmentService.deleteDepartment(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/byDepartment/{departmentId}")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable Long departmentId) {
        List<Doctor> doctors = doctorService.findDoctorsByDepartmentId(departmentId);
        return ResponseEntity.ok(doctors);
    }

}
