package com.examly.springapp.repository;

import com.examly.springapp.model.AdminRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRequestRepository extends JpaRepository<AdminRequest, Long> {
    List<AdminRequest> findByStatus(AdminRequest.RequestStatus status);
    boolean existsByEmail(String email);
}
