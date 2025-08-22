package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import com.examly.springapp.configuration.JWTUtil;
import com.examly.springapp.exception.DuplicateUserEmailException;
import com.examly.springapp.exception.UserNotFoundException;
import com.examly.springapp.exception.InvalidUserPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.service.AdminRequestService;
import com.examly.springapp.model.AdminRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AdminRequestService adminRequestService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> requestData) {
        try {
            User user = new User();
            
            // Handle different field names for admin requests
            if (requestData.containsKey("fullName")) {
                user.setName((String) requestData.get("fullName"));
                user.setEmail((String) requestData.get("userEmail"));
                user.setPassword((String) requestData.get("userPass"));
                user.setRole(User.Role.valueOf((String) requestData.get("role")));
            } else {
                user.setName((String) requestData.get("name"));
                user.setEmail((String) requestData.get("email"));
                user.setPassword((String) requestData.get("password"));
                if (requestData.containsKey("role")) {
                    user.setRole(User.Role.valueOf((String) requestData.get("role")));
                }
            }
            
            // Check if the user is trying to register as ADMIN
            if (user.getRole() == User.Role.ADMIN) {
                // Create an admin request instead of directly registering
                AdminRequest savedRequest = adminRequestService.createAdminRequest(
                    user.getName(), 
                    user.getEmail(), 
                    user.getPassword()
                );
                
                return ResponseEntity.ok(Map.of(
                    "message", "Your admin registration request has been submitted and is pending super admin approval.",
                    "requestId", savedRequest.getId(),
                    "status", "PENDING"
                ));
            }
            
            // For other roles, proceed with normal registration
            User registeredUser = userService.register(user);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(registeredUser.getEmail(), registeredUser.getRole().toString());
            
            // Create response with user data and token
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.getId());
            response.put("name", registeredUser.getName());
            response.put("email", registeredUser.getEmail());
            response.put("role", registeredUser.getRole());
            response.put("token", token);
            
            return ResponseEntity.ok(response);
        } catch (DuplicateUserEmailException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        try {
            // Handle both standard and admin login formats
            String email = credentials.containsKey("userEmail") ? 
                credentials.get("userEmail") : credentials.get("email");
            String password = credentials.containsKey("userPass") ? 
                credentials.get("userPass") : credentials.get("password");
            String role = credentials.containsKey("userRole") ? 
                credentials.get("userRole") : credentials.get("role");

            User authenticatedUser = userService.login(email, password, role);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(authenticatedUser.getEmail(), authenticatedUser.getRole().toString());
            
            // Create response with user data and token
            Map<String, Object> response = new HashMap<>();
            response.put("id", authenticatedUser.getId());
            response.put("name", authenticatedUser.getName());
            response.put("email", authenticatedUser.getEmail());
            response.put("role", authenticatedUser.getRole());
            response.put("token", token);
            
            return ResponseEntity.ok(response);
        } catch (UserNotFoundException | InvalidUserPasswordException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @GetMapping
    public List<User> getAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.register(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User updated = userService.updateProfile(id, updatedUser);
            return ResponseEntity.ok(updated);
        } catch (DuplicateUserEmailException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", e.getMessage()));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to update user profile"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (userService.findById(id).isPresent()) {
            userService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //used
    //get users by role(reviewer || admin || inspector)
    //called from adminapp - get no of reviewers for dashboard
    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        try {
            User.Role userRole = User.Role.valueOf(role.toUpperCase());
            List<User> users = userService.findByRole(userRole);
            return ResponseEntity.ok(users);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    

    
}
