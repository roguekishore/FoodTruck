package com.examly.springapp.controller;

import com.examly.springapp.model.Application;
import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> getAll() {
        return reviewService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getById(@PathVariable Long id) {
        return reviewService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Review create(@RequestBody Review review) {
        return reviewService.save(review);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> update(@PathVariable Long id, @RequestBody Review updatedReview) {
        return reviewService.findById(id)
                .map(existing -> {
                    updatedReview.setId(id);
                    return ResponseEntity.ok(reviewService.save(updatedReview));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (reviewService.findById(id).isPresent()) {
            reviewService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // New endpoints for enum-based queries
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Review>> getByStatus(@PathVariable String status) {
        try {
            Review.ReviewStatus reviewStatus = Review.ReviewStatus.valueOf(status.toUpperCase());
            List<Review> reviews = reviewService.findByReviewStatus(reviewStatus);
            return ResponseEntity.ok(reviews);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/reviewer/{reviewerId}")
    public List<Review> getByReviewerId(@PathVariable Long reviewerId) {
        return reviewService.findByReviewerId(reviewerId);
    }

    @PutMapping("/{reviewId}/status/{status}")
    @Transactional
    public ResponseEntity<?> updateReviewStatus(@PathVariable Long reviewId, @PathVariable String status) {
        try {
            Review.ReviewStatus reviewStatus = Review.ReviewStatus.valueOf(status.toUpperCase());
            Review updatedReview = reviewService.updateReviewStatus(reviewId, reviewStatus);

            return ResponseEntity.ok(updatedReview);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid status. Use APPROVED, REJECTED, or IN_PROGRESS"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}
