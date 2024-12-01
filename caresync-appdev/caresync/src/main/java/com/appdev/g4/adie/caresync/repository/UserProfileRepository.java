package com.appdev.g4.adie.caresync.repository;

import java.util.Optional;  // Updated import

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.entity.UserProfile;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    
    // Method to find UserProfile by the associated User
    UserProfile findByUser(User user);
    
    // Custom query to find UserProfile by username of the associated User
    @Query("SELECT up FROM UserProfile up WHERE up.user.username = :username")
    Optional<UserProfile> findByUsername(@Param("username") String username);
}
