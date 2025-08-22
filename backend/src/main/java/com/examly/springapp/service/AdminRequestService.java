package com.examly.springapp.service;

import com.examly.springapp.model.AdminRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.AdminRequestRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminRequestService {

    @Autowired
    private AdminRequestRepository adminRequestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public AdminRequest createAdminRequest(String name, String email, String password) {
        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists in the system");
        }

        // Check if there's already a pending request with this email
        if (adminRequestRepository.existsByEmail(email)) {
            throw new RuntimeException("Admin request with this email already exists");
        }

        AdminRequest request = new AdminRequest(name, email, password);
        return adminRequestRepository.save(request);
    }

    public List<AdminRequest> getAllPendingRequests() {
        return adminRequestRepository.findByStatus(AdminRequest.RequestStatus.PENDING);
    }

    public List<AdminRequest> getAllRequests() {
        return adminRequestRepository.findAll();
    }

    public Optional<AdminRequest> findById(Long id) {
        return adminRequestRepository.findById(id);
    }

    @Transactional
    public AdminRequest approveRequest(Long requestId, Long superAdminId) {
        AdminRequest request = adminRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Admin request not found"));

        if (request.getStatus() != AdminRequest.RequestStatus.PENDING) {
            throw new RuntimeException("Request has already been processed");
        }

        // Get super admin user
        User superAdmin = userRepository.findById(superAdminId)
                .orElseThrow(() -> new RuntimeException("Super admin not found"));

        // Create the admin user account
        User newAdmin = new User();
        newAdmin.setName(request.getName());
        newAdmin.setEmail(request.getEmail());
        newAdmin.setPassword(request.getPassword());
        newAdmin.setRole(User.Role.ADMIN);

        userService.register(newAdmin);

        // Update request status
        request.setStatus(AdminRequest.RequestStatus.APPROVED);
        request.setReviewDate(LocalDateTime.now());
        request.setReviewedBy(superAdmin);

        return adminRequestRepository.save(request);
    }

    @Transactional
    public AdminRequest rejectRequest(Long requestId, Long superAdminId, String rejectionReason) {
        AdminRequest request = adminRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Admin request not found"));

        if (request.getStatus() != AdminRequest.RequestStatus.PENDING) {
            throw new RuntimeException("Request has already been processed");
        }

        // Get super admin user
        User superAdmin = userRepository.findById(superAdminId)
                .orElseThrow(() -> new RuntimeException("Super admin not found"));

        // Update request status
        request.setStatus(AdminRequest.RequestStatus.REJECTED);
        request.setReviewDate(LocalDateTime.now());
        request.setReviewedBy(superAdmin);
        request.setRejectionReason(rejectionReason);

        return adminRequestRepository.save(request);
    }

    public void deleteRequest(Long requestId) {
        adminRequestRepository.deleteById(requestId);
    }
}
