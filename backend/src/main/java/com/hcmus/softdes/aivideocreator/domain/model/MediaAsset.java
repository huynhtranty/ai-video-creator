package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@SuperBuilder
public class MediaAsset extends Entity {
    private String text;
    private String provider;
    private String url;
    private String filename;
    private UUID projectId;
    private UUID scriptId;

    public MediaAsset(
        UUID id, 
        LocalDateTime createAt,
        LocalDateTime updateAt,
        String text,
        String provider,
        String url,
        String filename,
        UUID projectId,
        UUID scriptId
    ) {
        super(id, createAt, updateAt);
        this.text = text;
        this.provider = provider;
        this.url = url;
        this.filename = filename;
        this.projectId = projectId;
        this.scriptId = scriptId;
    }
    
    public static MediaAsset create(
        String text,
        String provider,
        String url,
        String filename,
        UUID projectId,
        UUID scriptId
    ) {
        return new MediaAsset(
            UUID.randomUUID(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            text,
            provider,
            url,
            filename,
            projectId,
            scriptId
        );
    }
}
