package com.hcmus.softdes.aivideocreator.domain.enums;

public enum Status {
    UNPUBLISHED("Unpublished"),
    PENDING("Pending"),
    IN_PROGRESS("In Progress"),
    COMPLETED("Completed"),
    FAILED("Failed");

    private final String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
