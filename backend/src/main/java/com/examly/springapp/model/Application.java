package com.examly.springapp.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "food_truck_id", referencedColumnName = "id")
    private FoodTruck foodTruck;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    private LocalDateTime submissionDate;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Document> documents;

    @OneToOne(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private Review review;

    public enum ApplicationStatus {
        SUBMITTED, IN_REVIEW, APPROVED, REJECTED
    }

    // No-args constructor
    public Application() {
    }

    // All-args constructor
    public Application(Long id, FoodTruck foodTruck, Vendor vendor, LocalDateTime submissionDate, ApplicationStatus status, List<Document> documents, Review review) {
        this.id = id;
        this.foodTruck = foodTruck;
        this.vendor = vendor;
        this.submissionDate = submissionDate;
        this.status = status;
        this.documents = documents;
        this.review = review;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FoodTruck getFoodTruck() {
        return foodTruck;
    }

    public void setFoodTruck(FoodTruck foodTruck) {
        this.foodTruck = foodTruck;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public void setVendor(Vendor vendor) {
        this.vendor = vendor;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }
}
