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

            // Validating input data
            if (username == null || name == null || email == null || phoneNumber == null || password == null || confirmPassword == null) {
                throw new IllegalArgumentException("All fields are required.");
            }

            if (!password.equals(confirmPassword)) {
                throw new IllegalArgumentException("Passwords do not match.");
            }

            // Creating and saving the user
            User user = new User();
            user.setUsername(username);
            user.setName(name);
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            user.setPassword(password);

            User registeredUser = userService.register(user, confirmPassword);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.getUserId());
            response.put("username", registeredUser.getUsername());
            response.put("name", registeredUser.getName());
            response.put("email", registeredUser.getEmail()); // Add email
            response.put("phoneNumber", registeredUser.getPhoneNumber()); // Add phone number
            response.put("token", jwtUtil.generateToken(registeredUser));
            response.put("isNewUser", registeredUser.isNewUser());

            return ResponseEntity.ok(response);
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

        Optional<User> optionalUser = userService.findUserByUsername(username);
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(password)) {
            User user = optionalUser.get();

            // Include the name field in the response
            String token = jwtUtil.generateToken(user);
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getUserId());
            response.put("username", user.getUsername());
            response.put("name", user.getName()); // Add this line
            response.put("email", user.getEmail()); // Add email
            response.put("phoneNumber", user.getPhoneNumber()); // Add phone number
            response.put("token", token);
            response.put("isNewUser", user.isNewUser());

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid username or password."));
        }
    }


    // Complete onboarding and update isNewUser status
    @PostMapping("/{userId}/complete-onboarding")
    public ResponseEntity<?> completeOnboarding(@PathVariable Long userId) {
        try {
            userService.completeOnboarding(userId);
            return ResponseEntity.ok(Map.of("message", "Onboarding completed successfully."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // Check if a user is new
    @GetMapping("/{userId}/is-new-user")
    public ResponseEntity<Map<String, Boolean>> checkIsNewUser(@PathVariable Long userId) {
        boolean isNewUser = userService.isNewUser(userId);
        return ResponseEntity.ok(Map.of("isNewUser", isNewUser));
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

            // Include the name field in the response
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.getUserId());
            response.put("username", user.getUsername());
            response.put("name", user.getName()); // Add this line
            response.put("email", user.getEmail()); // Add email
            response.put("phoneNumber", user.getPhoneNumber()); // Add phone number
            response.put("token", token);
            response.put("isNewUser", user.isNewUser());

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

    // Find user by username
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        Optional<User> optionalUser = userService.findUserByUsername(username);
        return optionalUser.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
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

    // Get logged-in user information
    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInUser(@RequestHeader("userId") Long userId) {
        // Check if userId is valid and return user details
        Optional<User> optionalUser = userService.findUserById(userId);  // Find user by userId

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("name", user.getName());
            response.put("email", user.getEmail());
            response.put("phoneNumber", user.getPhoneNumber());
            return ResponseEntity.ok(response);
        } else {
            // User not found
            return ResponseEntity.status(404).body(Map.of("message", "User not found."));
        }
    }






    // Get all cards for a user
    @GetMapping("/{userId}/cards")
    public ResponseEntity<List<Card>> getCardsForUser(@PathVariable Long userId) {
        List<Card> cards = userService.getCardsForUser(userId);
        return ResponseEntity.ok(cards);
    }

    // Fetch user public information by ID (name, phone number, email)
    @GetMapping("/{userId}/public-info")
    public ResponseEntity<?> getPublicUserInfo(@PathVariable Long userId) {
        Optional<User> optionalUser = userService.findUserById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Map<String, Object> response = new HashMap<>();
            response.put("name", user.getName());
            response.put("phoneNumber", user.getPhoneNumber());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "User not found."));
        }
    }

}
