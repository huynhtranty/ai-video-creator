package com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface R2Client {
    public String uploadVideo(String key, InputStream videoStream, long size);
    public void deleteVideo(String key);
    public boolean videoExists(String key);
    public InputStream getVideo(String key);
}