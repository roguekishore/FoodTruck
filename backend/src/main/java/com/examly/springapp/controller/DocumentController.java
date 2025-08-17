package com.examly.springapp.controller;

import com.examly.springapp.model.Document;
import com.examly.springapp.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<Document> getAll() {
        return documentService.findAll();
    }

    @GetMapping("/{id}")   // escaped with double braces
    public ResponseEntity<Document> getById(@PathVariable Long id) {
        return documentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Document create(@RequestBody Document document) {
        return documentService.save(document);
    }

    @PutMapping("/{id}")   // escaped
    public ResponseEntity<Document> update(@PathVariable Long id, @RequestBody Document updatedDocument) {
        return documentService.findById(id)
                .map(existing -> {
                    updatedDocument.setId(id);
                    return ResponseEntity.ok(documentService.save(updatedDocument));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")   // escaped
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (documentService.findById(id).isPresent()) {
            documentService.delete(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
