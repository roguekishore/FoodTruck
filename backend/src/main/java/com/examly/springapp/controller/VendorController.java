package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Vendor;
import com.examly.springapp.service.VendorService;

import lombok.Data;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/vendors")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    @PostMapping("/register")
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        Vendor savedVendor = vendorService.saveVendor(vendor);
        return new ResponseEntity<>(savedVendor, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginVendor(@RequestBody LoginRequest credentials) {
        try {
            Vendor vendor = vendorService.loginVendor(
                    credentials.getEmailId(),
                    credentials.getPassword());
            return ResponseEntity.ok(vendor);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @Data
    public static class LoginRequest {
        private String emailId;
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
    public ResponseEntity<Vendor> putVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        try {
            Vendor updatedVendor = vendorService.putVendor(id, vendor);
            return new ResponseEntity<>(updatedVendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Vendor> patchVendor(@PathVariable Long id, @RequestBody Vendor vendor) {
        try {
            Vendor patchedVendor = vendorService.patchVendor(id, vendor);
            return new ResponseEntity<>(patchedVendor, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Vendor>> saveAllVendors(@RequestBody List<Vendor> vendors) {
        List<Vendor> savedVendors = vendorService.saveAllVendors(vendors);
        return new ResponseEntity<>(savedVendors, HttpStatus.CREATED);
    }
}