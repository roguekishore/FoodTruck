package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Vendor;
import com.examly.springapp.service.VendorService;
import com.examly.springapp.configuration.JWTUtil;

import lombok.Data;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;
    
    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> createVendor(@RequestBody Vendor vendor) {
        try {
            Vendor savedVendor = vendorService.saveVendor(vendor);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(savedVendor.getEmail(), "VENDOR");
            
            // Create response with vendor data and token
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedVendor.getId());
            response.put("name", savedVendor.getName());
            response.put("email", savedVendor.getEmail());
            response.put("role", "VENDOR");
            response.put("token", token);
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginVendor(@RequestBody LoginRequest credentials) {
        try {
            Vendor vendor = vendorService.loginVendor(
                    credentials.getEmail(),
                    credentials.getPassword());
                    
            // Generate JWT token
            String token = jwtUtil.generateToken(vendor.getEmail(), "VENDOR");
            
            // Create response with vendor data and token
            Map<String, Object> response = new HashMap<>();
            response.put("id", vendor.getId());
            response.put("name", vendor.getName());
            response.put("email", vendor.getEmail());
            response.put("role", "VENDOR");
            response.put("token", token);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @GetMapping("/{id}")
    public Optional<Vendor> getVendorById(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    @GetMapping
    public List<Vendor> getAllVendors() {
        return vendorService.getAllVendors();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/all")
    public ResponseEntity<Void> deleteAllVendors() {
        vendorService.deleteAllVendors();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        try {
            Vendor updatedVendor = vendorService.putVendor(id, vendor);
            return new ResponseEntity<>(updatedVendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Check if it's a duplicate email error
            if (e.getMessage().contains("email already exists")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Collections.singletonMap("message", e.getMessage()));
            }
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        try {
            Vendor patchedVendor = vendorService.patchVendor(id, vendor);
            return new ResponseEntity<>(patchedVendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Vendor>> saveAllVendors(@RequestBody List<Vendor> vendors) {
        List<Vendor> savedVendors = vendorService.saveAllVendors(vendors);
        return new ResponseEntity<>(savedVendors, HttpStatus.CREATED);
    }
}