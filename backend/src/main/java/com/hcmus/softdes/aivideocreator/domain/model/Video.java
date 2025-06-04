package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@Setter
public class Video extends Entity {
    String title;
    String description;
    String filePath;
    Status status;
    Platform platform; // Optional field for social media platform
    int duration;
    UUID projectId;
    UUID userId;
}
