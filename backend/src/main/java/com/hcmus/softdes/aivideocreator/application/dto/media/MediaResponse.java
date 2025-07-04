package com.hcmus.softdes.aivideocreator.application.dto.media;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class MediaResponse {
    private String id;
    private String text;
    private String provider;
    private String url;
    private UUID projectId;
    private UUID scriptId;
}
