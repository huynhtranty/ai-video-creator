package com.hcmus.softdes.aivideocreator.application.dto.media;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MediaResponse {
    private String id;
    private String url;
    private String format;
    private String provider;
    private String projectId;
    private String status;
    private String createdAt;
    private String updatedAt;

    public MediaResponse(String id, String url, String format, String provider, String projectId, String status, String createdAt, String updatedAt) {
        this.id = id;
        this.url = url;
        this.format = format;
        this.provider = provider;
        this.projectId = projectId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
