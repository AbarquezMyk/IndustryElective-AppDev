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

    // Find user by username
    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Register a new user
    public User register(User user, String confirmPassword) {
        // Validate that the password and confirm password match
        if (!user.getPassword().equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match.");
        }

        // Set isNewUser to true for all new users
        user.setNewUser(true);

        // Additional logic for registration (e.g., password encoding) can go here
        return userRepository.save(user);
    }

    // Login logic
    public Optional<User> login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password));
    }

    // Mark user as no longer new after onboarding
    public void completeOnboarding(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setNewUser(false);
        userRepository.save(user);
    }

    // Update user details
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Only update fields that are non-null
                    if (updatedUser.getName() != null) {
                        existingUser.setName(updatedUser.getName());
                    }
                    if (updatedUser.getEmail() != null) {
                        existingUser.setEmail(updatedUser.getEmail());
                    }
                    if (updatedUser.getPassword() != null) {
                        existingUser.setPassword(updatedUser.getPassword());
                    }
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

    // Get all cards for the user
    public List<Card> getCardsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return cardService.getCardsByUser(user);
    }

    // Google Authentication logic
    public User authenticateWithGoogle(String idToken) throws Exception {
        GoogleIdToken.Payload payload = googleAuthService.verifyToken(idToken);

        if (payload.getEmail() != null && !payload.getEmail().isEmpty() &&
            payload.getSubject() != null && !payload.getSubject().isEmpty()) {

            Optional<User> existingUser = userRepository.findByEmailOrGoogleId(payload.getEmail(), payload.getSubject());

            User user = existingUser.orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(payload.getEmail());
                newUser.setGoogleId(payload.getSubject());
                String name = (String) payload.get("name");
                newUser.setName(name != null ? name : "Default Name");
                newUser.setNewUser(true); // Mark as a new user
                return newUser;
            });

            // Ensure name is updated if present in the payload
            String name = (String) payload.get("name");
            if (name != null && !name.isEmpty()) {
                user.setName(name);
            }

            return userRepository.save(user);

        } else {
            throw new IllegalArgumentException("Invalid Google token: email or Google ID is missing");
        }
    }

    // Check if a user is new
    public boolean isNewUser(Long userId) {
        return userRepository.findByUserIdAndIsNewUserTrue(userId).isPresent();
    }
}
