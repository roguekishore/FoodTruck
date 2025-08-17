package com.examly.springapp.service;

import com.examly.springapp.model.Inspection;
import com.examly.springapp.repository.InspectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InspectionService {
    private final InspectionRepository inspectionRepository;

    public InspectionService(InspectionRepository inspectionRepository) {
        this.inspectionRepository = inspectionRepository;
    }

    public List<Inspection> findAll() {
        return inspectionRepository.findAll();
    }

    public Optional<Inspection> findById(Long id) {
        return inspectionRepository.findById(id);
    }

    public Inspection save(Inspection inspection) {
        return inspectionRepository.save(inspection);
    }

    public void delete(Long id) {
        inspectionRepository.deleteById(id);
    }
}
