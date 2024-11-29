package com.appdev.g4.adie.caresync.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.appdev.g4.adie.caresync.entity.Card;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardService cardService; // Inject CardService

    @Autowired
    private GoogleAuthService googleAuthService; // Inject GoogleAuthService

    // Fetch all users
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Find user by ID
    public Optional<User> findUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Register a new user
    public User register(User user, String confirmPassword) {
        // Validate that the password and confirm password match
        if (!user.getPassword().equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match");
        }
        // Additional logic for registration (e.g., password encoding) can go here
        return userRepository.save(user);
    }

    // Login logic
    public Optional<User> login(String username, String password) {
        // Use Optional to avoid potential null pointer issues
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
    }

    // Update user details
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update fields
                    existingUser.setName(updatedUser.getName());
                    existingUser.setEmail(updatedUser.getEmail());
                    existingUser.setPassword(updatedUser.getPassword());
                    // Save updated user
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    // Delete user by ID
    public void deleteById(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new IllegalArgumentException("User not found");
        }
        userRepository.deleteById(userId);
    }

    // Find user by username
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Get all cards for the user
    public List<Card> getCardsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return cardService.getCardsByUser(user); // Retrieve cards using CardService
    }

    // Google Authentication logic
    public User authenticateWithGoogle(String idToken) throws Exception {
        // Step 1: Verify the Google ID token
        GoogleIdToken.Payload payload = googleAuthService.verifyToken(idToken);
    
        // Step 2: Check if the email and Google ID are valid
        if (payload.getEmail() != null && !payload.getEmail().isEmpty() && 
            payload.getSubject() != null && !payload.getSubject().isEmpty()) {
    
            // Step 3: Check if the user already exists (based on email or Google ID)
            Optional<User> existingUser = userRepository.findByEmailOrGoogleId(payload.getEmail(), payload.getSubject());
    
            // Step 4: If the user exists, update their details (name, email, etc.), else create a new user
            User user = existingUser.orElseGet(() -> {
                // If the user doesn't exist, create a new one
                User newUser = new User();
                newUser.setEmail(payload.getEmail());
                newUser.setGoogleId(payload.getSubject()); // Store the Google ID
    
                // Retrieve the name from the token payload (if present)
                String name = (String) payload.get("name");
                newUser.setName(name != null ? name : "Default Name"); // If name is missing, set a default name
    
                return newUser;
            });
    
            // Update the name if it's available in the payload (for existing users)
            String name = (String) payload.get("name");
            if (name != null && !name.isEmpty()) {
                user.setName(name);
            }
    
            // Save the updated or new user
            return userRepository.save(user);
    
        } else {
            // Step 5: If email or Google ID is missing, throw an exception
            throw new IllegalArgumentException("Invalid Google token: email or Google ID is missing");
        }
    }
}
