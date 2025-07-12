package com.hcmus.softdes.aivideocreator.application.common.exceptions;

public class YouTubeServiceException extends RuntimeException {
    public YouTubeServiceException(String message) {
        super(message);
    }

    public YouTubeServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}