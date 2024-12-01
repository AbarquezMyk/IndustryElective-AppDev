package com.appdev.g4.adie.caresync.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.UserProfile;
import com.appdev.g4.adie.caresync.service.UserProfileService;
import com.appdev.g4.adie.caresync.util.JwtUtil;

@RestController
@RequestMapping("/api/userprofiles")
public class UserProfileController {
    private final UserProfileService userProfileService;

    private final JwtUtil jwtUtil = new JwtUtil();

    @Autowired
    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/allprofile")
    public ResponseEntity<List<UserProfile>> getAllUserProfiles() {
        return ResponseEntity.ok(userProfileService.getAllUserProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getUserProfileById(@PathVariable Long id) {
        return userProfileService.getUserProfileById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/saveprofile")
    public ResponseEntity<UserProfile> saveUserProfile(@RequestBody UserProfile userProfile) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userProfileService.saveUserProfile(userProfile));
    }

    @DeleteMapping("/deleteprofile/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        userProfileService.deleteUserProfile(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUserProfile(@RequestHeader("Authorization") String token) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid or expired token.");
        }

        String username = jwtUtil.extractUsername(token);
        Optional<UserProfile> userProfileOpt = userProfileService.findByUsername(username);
        
        if (userProfileOpt.isPresent()) {
            return ResponseEntity.ok(userProfileOpt.get());
        } else {
            return ResponseEntity.status(404).body("User profile not found.");
        }
    }

}