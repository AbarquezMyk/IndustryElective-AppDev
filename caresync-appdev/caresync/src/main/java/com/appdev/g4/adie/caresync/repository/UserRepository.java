package com.appdev.g4.adie.caresync.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by username
    Optional<User> findByUsername(String username);

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find user by either email or Google ID
    Optional<User> findByEmailOrGoogleId(String email, String googleId);

    // New query method to find users based on userId and isNewUser status (default to true for new users)
    Optional<User> findByUserIdAndIsNewUserTrue(Long userId);
}
