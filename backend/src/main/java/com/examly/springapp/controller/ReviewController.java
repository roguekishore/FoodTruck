package com.examly.springapp.controller;

import com.examly.springapp.model.Review;
import com.examly.springapp.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}")   // escaped with double braces
    public ResponseEntity<Review> getById(@PathVariable Long id) {
        return reviewService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Review create(@RequestBody Review review) {
        return reviewService.save(review);
    }

    @PutMapping("/{id}")   // escaped
    public ResponseEntity<Review> update(@PathVariable Long id, @RequestBody Review updatedReview) {
        return reviewService.findById(id)
                .map(existing -> {
                    updatedReview.setId(id);
                    return ResponseEntity.ok(reviewService.save(updatedReview));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")   // escaped
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (reviewService.findById(id).isPresent()) {
            reviewService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
