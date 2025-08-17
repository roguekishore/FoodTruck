package com.examly.springapp.controller;

import com.examly.springapp.model.Application;
import com.examly.springapp.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Transactional(readOnly = true)
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<Application> getAll() {
        return applicationService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getById(@PathVariable Long id) {
        return applicationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Transactional
    public Application create(@RequestBody Application application) {
        return applicationService.save(application);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Application> update(@PathVariable Long id, @RequestBody Application updatedApplication) {
        return applicationService.findById(id)
                .map(existing -> {
                    updatedApplication.setId(id);
                    return ResponseEntity.ok(applicationService.save(updatedApplication));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (applicationService.findById(id).isPresent()) {
            applicationService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
