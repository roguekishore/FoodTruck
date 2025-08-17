package com.examly.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidOperatingRegionException extends RuntimeException {
    public InvalidOperatingRegionException(String message) {
        super(message);
    }
}