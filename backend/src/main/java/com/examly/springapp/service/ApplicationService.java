package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.FoodTruck;
import com.examly.springapp.model.Review;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ApplicationRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ReviewRepository reviewRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    public Optional<Application> findById(Long id) {
        return applicationRepository.findById(id);
    }

    public Application save(Application application) {
        return applicationRepository.save(application);
    }

    public void delete(Long id) {
        applicationRepository.deleteById(id);
    }

    @Transactional
    public Application assignReviewer(Long applicationId, Long reviewerId) {
        // Fetch the application
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));
        
        // Fetch the reviewer
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + reviewerId));
        
        // Validate that the user is a reviewer
        if (!reviewer.getRole().equals(User.Role.REVIEWER)) {
            throw new IllegalArgumentException("User with id " + reviewerId + " is not a reviewer");
        }
        
        // Check if application already has a review
        if (application.getReview() != null) {
            throw new IllegalArgumentException("Application already has a review assigned");
        }
        
        // Create new review entity
        Review review = new Review();
        review.setApplication(application);
        review.setReviewer(reviewer);
        review.setReviewDate(LocalDateTime.now()); // or setAssignedDate if you rename it
        review.setReviewStatus(Review.ReviewStatus.IN_PROGRESS); // Use enum instead of boolean
        
        // Save the review
        Review savedReview = reviewRepository.save(review);
        
        // Update application with review
        application.setReview(savedReview);
        application.setStatus(Application.ApplicationStatus.IN_REVIEW);
        
        // Save and return the updated application
        return applicationRepository.save(application);
    }

    @Transactional(readOnly = true)
    public List<FoodTruck> getFoodTrucksByApplicationStatus(Application.ApplicationStatus status) {
        return applicationRepository.findByStatus(status)
                .stream()
                .map(Application::getFoodTruck)
                .collect(Collectors.toList());
    }
}
