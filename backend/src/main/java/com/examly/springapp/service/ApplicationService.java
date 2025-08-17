package com.examly.springapp.service;

import com.examly.springapp.model.Application;
import com.examly.springapp.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public List<Application> findAll() {
        return applicationRepository.findAll();
    }

    public Optional<Application> findById(Long id) {
        return applicationRepository.findById(id);
    }

    public Application save(Application application) {
        return applicationRepository.save(application);
    }

    public void delete(Long id) {
        applicationRepository.deleteById(id);
    }
}
