package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.Review;
import com.examly.springapp.repository.ApplicationRepository;
import com.examly.springapp.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    
    @Autowired
    private ApplicationRepository applicationRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }

    // New methods for enum-based queries
    public List<Review> findByReviewStatus(Review.ReviewStatus reviewStatus) {
        return reviewRepository.findByReviewStatus(reviewStatus);
    }

    public List<Review> findByReviewerId(Long reviewerId) {
        return reviewRepository.findByReviewerId(reviewerId);
    }

    @Transactional
    public Review updateReviewStatus(Long reviewId, Review.ReviewStatus newStatus) {
        // Find the review
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + reviewId));
        
        // Update review status and date
        review.setReviewStatus(newStatus);
        review.setReviewDate(LocalDateTime.now());
        
        // Update the linked application status based on review status
        Application application = review.getApplication();
        if (application != null) {
            switch (newStatus) {
                case APPROVED:
                    application.setStatus(Application.ApplicationStatus.APPROVED);
                    break;
                case REJECTED:
                    application.setStatus(Application.ApplicationStatus.REJECTED);
                    break;
                case IN_PROGRESS:
                    application.setStatus(Application.ApplicationStatus.IN_REVIEW);
                    break;
            }
            applicationRepository.save(application);
        }
        
        // Save and return the updated review
        return reviewRepository.save(review);
    }
}
