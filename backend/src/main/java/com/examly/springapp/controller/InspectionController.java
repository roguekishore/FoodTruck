package com.examly.springapp.controller;

import com.examly.springapp.model.Inspection;
import com.examly.springapp.service.InspectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {
    private final InspectionService inspectionService;

    public InspectionController(InspectionService inspectionService) {
        this.inspectionService = inspectionService;
    }

    @GetMapping
    public List<Inspection> getAll() {
        return inspectionService.findAll();
    }

    @GetMapping("/{id}")   // escaped with double braces
    public ResponseEntity<Inspection> getById(@PathVariable Long id) {
        return inspectionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Inspection create(@RequestBody Inspection inspection) {
        return inspectionService.save(inspection);
    }

    @PutMapping("/{id}")   // escaped
    public ResponseEntity<Inspection> update(@PathVariable Long id, @RequestBody Inspection updatedInspection) {
        return inspectionService.findById(id)
                .map(existing -> {
                    updatedInspection.setId(id);
                    return ResponseEntity.ok(inspectionService.save(updatedInspection));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")   // escaped
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (inspectionService.findById(id).isPresent()) {
            inspectionService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/assign/{foodTruckId}/inspector/{inspectorId}")
    public ResponseEntity<?> assignInspector(@PathVariable Long foodTruckId, @PathVariable Long inspectorId) {
        try {
            Inspection inspection = inspectionService.assignInspectorToFoodTruck(foodTruckId, inspectorId);
            return ResponseEntity.ok(inspection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{inspectionId}/result/{result}")
    public ResponseEntity<?> updateInspectionResult(@PathVariable Long inspectionId, @PathVariable String result) {
        try {
            Inspection.InspectionResult inspectionResult = Inspection.InspectionResult.valueOf(result.toUpperCase());
            Inspection updatedInspection = inspectionService.updateInspectionResult(inspectionId, inspectionResult);
            return ResponseEntity.ok(updatedInspection);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid result. Use PASS, FAIL, or IN_PROGRESS"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    
}
