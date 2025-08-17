package com.examly.springapp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "food_trucks")
public class FoodTruck {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    @ToString.Exclude
    @JsonBackReference
    private Brand brand;

    @Column(nullable = false)
    private String operatingRegion;

    private String location;
    private String phoneNumber;
    private String cuisineSpecialties;
    private String menuHighlights;

    @OneToMany(mappedBy = "foodTruck" , cascade = CascadeType.ALL , orphanRemoval = true)
    private List<MenuItem> menuItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FoodTruck() {
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public String getOperatingRegion() {
        return operatingRegion;
    }

    public void setOperatingRegion(String operatingRegion) {
        this.operatingRegion = operatingRegion;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCuisineSpecialties() {
        return cuisineSpecialties;
    }

    public void setCuisineSpecialties(String cuisineSpecialties) {
        this.cuisineSpecialties = cuisineSpecialties;
    }

    public String getMenuHighlights() {
        return menuHighlights;
    }

    public void setMenuHighlights(String menuHighlights) {
        this.menuHighlights = menuHighlights;
    }

    public List<MenuItem> getMenuItems() {
        return menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }

    public FoodTruck(Long id, Brand brand, String operatingRegion, String location, String phoneNumber,
            String cuisineSpecialties, String menuHighlights, List<MenuItem> menuItems) {
        this.id = id;
        this.brand = brand;
        this.operatingRegion = operatingRegion;
        this.location = location;
        this.phoneNumber = phoneNumber;
        this.cuisineSpecialties = cuisineSpecialties;
        this.menuHighlights = menuHighlights;
        this.menuItems = menuItems;
    }
}
