package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.DuplicateVendorNameException;
import com.examly.springapp.model.Vendor;
import com.examly.springapp.repository.VendorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private VendorRepository vendorRepository;

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public Optional<Vendor> getVendorById(Long id) {
        return vendorRepository.findById(id);
    }

    public Vendor saveVendor(Vendor vendor) {
        String email = vendor.getEmailId();
        Optional<Vendor> v = vendorRepository.findByEmailId(email);
        if(v.isPresent()) {
            throw new DuplicateVendorNameException("A vendor with this email already exists");
        }
        return vendorRepository.save(vendor);
    }

    public void deleteVendor(Long id) {
        vendorRepository.deleteById(id);
    }

    public void deleteAllVendors() {
        vendorRepository.deleteAll();
    }

    public Vendor putVendor(Long id, Vendor updatedVendor) {
        Vendor existingVendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + id));

        existingVendor.setName(updatedVendor.getName());
        existingVendor.setPhoneNumber(updatedVendor.getPhoneNumber());
        existingVendor.setEmailId(updatedVendor.getEmailId());
        existingVendor.setAddress(updatedVendor.getAddress());

        return vendorRepository.save(existingVendor);
    }

    public Vendor patchVendor(Long id, Vendor updatedVendor) {
        Vendor existingVendor = vendorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found with ID: " + id));

        if (updatedVendor.getName() != null) {
            existingVendor.setName(updatedVendor.getName());
        }
        if (updatedVendor.getPhoneNumber() != null) {
            existingVendor.setPhoneNumber(updatedVendor.getPhoneNumber());
        }
        if (updatedVendor.getEmailId() != null) {
            existingVendor.setEmailId(updatedVendor.getEmailId());
        }
        if (updatedVendor.getAddress() != null) {
            existingVendor.setAddress(updatedVendor.getAddress());
        }

        return vendorRepository.save(existingVendor);
    }

    public List<Vendor> saveAllVendors(List<Vendor> vendors) {
        return vendorRepository.saveAll(vendors);
    }

    public Vendor loginVendor(String email, String password) {
        Vendor vendor = vendorRepository.findByEmailId(email)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        
        if (!vendor.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        
        return vendor;
    }
}