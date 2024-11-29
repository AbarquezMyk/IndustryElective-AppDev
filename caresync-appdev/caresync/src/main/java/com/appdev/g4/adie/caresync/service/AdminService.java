package com.appdev.g4.adie.caresync.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Admin;
import com.appdev.g4.adie.caresync.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public void saveAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    public boolean validateAdmin(Admin admin) {
        // Fetch the admin details from the database using email
        Admin existingAdmin = adminRepository.findByEmail(admin.getEmail());
        
        if (existingAdmin != null && existingAdmin.getPassword().equals(admin.getPassword())) {
            return true; // Credentials are valid
        }
        return false; // Invalid credentials
    }
}