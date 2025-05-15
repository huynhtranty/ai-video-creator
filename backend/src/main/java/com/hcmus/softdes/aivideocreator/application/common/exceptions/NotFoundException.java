package com.hcmus.softdes.aivideocreator.application.common.exceptions;

public abstract class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}
