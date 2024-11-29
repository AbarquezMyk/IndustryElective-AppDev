package com.appdev.g4.adie.caresync.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.appdev.g4.adie.caresync.entity.Card;
import com.appdev.g4.adie.caresync.entity.User;
import com.appdev.g4.adie.caresync.service.UserService;
import com.appdev.g4.adie.caresync.util.JwtUtil;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userMap) {
        try {
            String username = userMap.get("username");
            String name = userMap.get("name");
            String email = userMap.get("email");
            String phoneNumber = userMap.get("phoneNumber");
            String password = userMap.get("password");
            String confirmPassword = userMap.get("confirmPassword");

            if (username == null || name == null || email == null || phoneNumber == null || password == null || confirmPassword == null) {
                throw new IllegalArgumentException("All fields are required.");
            }

            if (!password.equals(confirmPassword)) {
                throw new IllegalArgumentException("Passwords do not match.");
            }

            User user = new User();
            user.setUsername(username);
            user.setName(name);
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            user.setPassword(password);

            User registeredUser = userService.register(user, confirmPassword);
            return ResponseEntity.ok(registeredUser);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // Login a user and generate a JWT token
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username and password are required."));
        }

        // Find user by username
        Optional<User> optionalUser = userService.findByUsername(username);

        // Check if user exists and password matches
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
            User user = optionalUser.get();

            // Generate JWT token
            String token = jwtUtil.generateToken(user);

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getUserId());
            response.put("username", user.getUsername());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            // Invalid credentials
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password."));
        }
    }

    // Login with Google OAuth
    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> googleToken) {
        try {
            String idToken = googleToken.get("idToken");

            if (idToken == null || idToken.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Google ID token is required."));
            }

            User user = userService.authenticateWithGoogle(idToken);
            String token = jwtUtil.generateToken(user);

            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getUserId());
            response.put("username", user.getUsername());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Error authenticating with Google: " + e.getMessage()));
        }
    }

    // Fetch all users
    @GetMapping
    public ResponseEntity<List<User>> findAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    // Find user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable Long id) {
        User user = userService.findUserById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> optionalUser = userService.findUserByUsername(username);
        if (optionalUser.isPresent()) {
            return ResponseEntity.ok(optionalUser.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update user details
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return ResponseEntity.ok(userService.updateUser(id, updatedUser));
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Protected endpoint example
    @GetMapping("/protected-endpoint")
    public ResponseEntity<?> protectedEndpoint(@RequestHeader("Authorization") String token) {
        if (jwtUtil.validateToken(token)) {
            return ResponseEntity.ok("Access granted.");
        } else {
            return ResponseEntity.status(401).body("Invalid or expired token.");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUser(@RequestHeader("Authorization") String token) {
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid or expired token.");
        }
        String username = jwtUtil.extractUsername(token);
        Optional<User> optionalUser = userService.findUserByUsername(username);
        if (optionalUser.isPresent()) {
            // Only return the username in the response
            return ResponseEntity.ok(Map.of("username", optionalUser.get().getUsername()));
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    // Get all cards for a user
    @GetMapping("/{userId}/cards")
    public ResponseEntity<List<Card>> getCardsForUser(@PathVariable Long userId) {
        List<Card> cards = userService.getCardsForUser(userId);
        return ResponseEntity.ok(cards);
    }

}
