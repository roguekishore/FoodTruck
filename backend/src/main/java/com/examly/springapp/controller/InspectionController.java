package com.examly.springapp.controller;

import com.examly.springapp.model.Inspection;
import com.examly.springapp.service.InspectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
