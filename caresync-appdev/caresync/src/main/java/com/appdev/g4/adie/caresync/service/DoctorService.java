package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.DoctorEntity;
import com.appdev.g4.adie.caresync.repository.DoctorRepository;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public DoctorEntity saveDoctor(DoctorEntity doctor) {
        return doctorRepository.save(doctor);
    }

    public List<DoctorEntity> getAllDoctors() {
        return doctorRepository.findAll();
    }

    
    public DoctorEntity updateDoctor(Long doctorId, DoctorEntity newDoctor) throws NameNotFoundException {
        DoctorEntity doctor;
        try {
            doctor = doctorRepository.findById(doctorId).get();
            
            doctor.setDoctorName(newDoctor.getDoctorName());
            doctor.setContactInformation(newDoctor.getContactInformation());
            doctor.setStatus(newDoctor.getStatus());
            doctor.setLocation(newDoctor.getLocation());
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Doctor " + doctorId + " not found");
        }
        return doctorRepository.save(doctor);
    }

    
    public String deleteDoctor(Long doctorId) {
        if (doctorRepository.findById(doctorId).isPresent()) {
            doctorRepository.deleteById(doctorId);
            return "Doctor Record successfully deleted!";
        } else {
            return doctorId + " NOT found!";
        }
    }
}