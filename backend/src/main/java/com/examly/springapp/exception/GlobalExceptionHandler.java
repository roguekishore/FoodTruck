package com.examly.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidOperatingRegionException.class)
    public ResponseEntity<String> handleInvalidOperatingRegionException(InvalidOperatingRegionException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateVendorNameException.class)
    public ResponseEntity<String> handleDuplicateVendorNameException(DuplicateVendorNameException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    
}