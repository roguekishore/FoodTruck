package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

     public User register(User user) {
        // Validate required fields
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (user.getRole() == null) {
            throw new IllegalArgumentException("Role must be specified");
        }

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Save user with plain password (not recommended for production)
        return userRepository.save(user);
    }

    public User login(String email, String password, String role) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        User user = userOptional.get();
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Verify role
        if (!user.getRole().toString().equalsIgnoreCase(role)) {
            throw new IllegalArgumentException("User is not a " + role);
        }

        return user;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        if (user.getRole() == null) {
            throw new IllegalArgumentException("Role must be specified.");
        }
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> findByRole(User.Role role) {
        return userRepository.findByRole(role);
    }
}
