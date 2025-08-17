package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Brand;
import com.examly.springapp.model.FoodTruck;
import com.examly.springapp.repository.BrandRepository;
import com.examly.springapp.repository.FoodTruckRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FoodTruckService {

    @Autowired
    private FoodTruckRepository foodTruckRepository;

    @Autowired
    private BrandRepository brandRepository;

    public FoodTruck saveFoodTruck(Long brandId, FoodTruck foodTruck) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + brandId));
        foodTruck.setBrand(brand);
        return foodTruckRepository.save(foodTruck);
    }

    public List<FoodTruck> getAllFoodTrucks() {
        return foodTruckRepository.findAll();
    }

    public Optional<FoodTruck> getFoodTruckById(Long id) {
        return foodTruckRepository.findById(id);
    }

    public List<FoodTruck> getFoodTrucksByBrandId(Long brandId) {
        return foodTruckRepository.findByBrandId(brandId);
    }

    public void deleteFoodTruck(Long id) {
        foodTruckRepository.deleteById(id);
    }

    public void deleteAllFoodTrucks() {
        foodTruckRepository.deleteAll();
    }

    public FoodTruck putFoodTruck(Long id, FoodTruck updatedFoodTruck) {
        FoodTruck existingFoodTruck = foodTruckRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FoodTruck not found with ID: " + id));

        existingFoodTruck.setOperatingRegion(updatedFoodTruck.getOperatingRegion());
        existingFoodTruck.setLocation(updatedFoodTruck.getLocation());
        existingFoodTruck.setPhoneNumber(updatedFoodTruck.getPhoneNumber());
        existingFoodTruck.setCuisineSpecialties(updatedFoodTruck.getCuisineSpecialties());
        existingFoodTruck.setMenuHighlights(updatedFoodTruck.getMenuHighlights());

        return foodTruckRepository.save(existingFoodTruck);
    }

    public FoodTruck patchFoodTruck(Long id, FoodTruck updatedFoodTruck) {
        FoodTruck existingFoodTruck = foodTruckRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FoodTruck not found with ID: " + id));

        if (updatedFoodTruck.getOperatingRegion() != null) {
            existingFoodTruck.setOperatingRegion(updatedFoodTruck.getOperatingRegion());
        }
        if (updatedFoodTruck.getLocation() != null) {
            existingFoodTruck.setLocation(updatedFoodTruck.getLocation());
        }
        if (updatedFoodTruck.getPhoneNumber() != null) {
            existingFoodTruck.setPhoneNumber(updatedFoodTruck.getPhoneNumber());
        }
        if (updatedFoodTruck.getCuisineSpecialties() != null) {
            existingFoodTruck.setCuisineSpecialties(updatedFoodTruck.getCuisineSpecialties());
        }
        if (updatedFoodTruck.getMenuHighlights() != null) {
            existingFoodTruck.setMenuHighlights(updatedFoodTruck.getMenuHighlights());
        }

        return foodTruckRepository.save(existingFoodTruck);
    }

    public List<FoodTruck> saveAllFoodTrucks(Long brandId, List<FoodTruck> foodTrucks) {
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found with ID: " + brandId));

        for (FoodTruck foodTruck : foodTrucks) {
            foodTruck.setBrand(brand);
        }

        return foodTruckRepository.saveAll(foodTrucks);
    }
}
