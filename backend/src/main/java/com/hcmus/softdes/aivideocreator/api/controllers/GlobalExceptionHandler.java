package com.hcmus.softdes.aivideocreator.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {

    // Custom exception for handling specific cases
//    @ExceptionHandler(NotFoundException.class)
//    public ProblemDetail handleNotFoundException(NotFoundException e) {
//        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
//    }


    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(Exception e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }
}
