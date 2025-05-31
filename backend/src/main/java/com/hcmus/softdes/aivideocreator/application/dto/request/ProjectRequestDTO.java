package com.hcmus.softdes.aivideocreator.application.dto.request;

import lombok.Data;

import java.util.UUID;

@Data
public class ProjectRequestDTO {
    private UUID userId;
    private String name;
}