package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.DoctorDepartment;
import com.appdev.g4.adie.caresync.repository.DoctorDepartmentRepository;

@Service
public class DoctorDepartmentService {

    @Autowired
    private DoctorDepartmentRepository doctorDepartmentRepository;

    public DoctorDepartment findById(Long id) {
        return doctorDepartmentRepository.findById(id).orElse(null);
    }
    
    public List<DoctorDepartment> getAllDepartments() {
        return doctorDepartmentRepository.findAll();
    }

    public DoctorDepartment getDepartmentById(Long id) {
        Optional<DoctorDepartment> department = doctorDepartmentRepository.findById(id);
        return department.orElse(null);
    }

    public DoctorDepartment createDepartment(DoctorDepartment doctorDepartment) {
        return doctorDepartmentRepository.save(doctorDepartment);
    }

    public DoctorDepartment updateDepartment(Long id, DoctorDepartment updatedDepartment) {
        if (doctorDepartmentRepository.existsById(id)) {
            updatedDepartment.setDepartmentId(id);
            return doctorDepartmentRepository.save(updatedDepartment);
        }
        return null;
    }

    public boolean deleteDepartment(Long id) {
        if (doctorDepartmentRepository.existsById(id)) {
            doctorDepartmentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
