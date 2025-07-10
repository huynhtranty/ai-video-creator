package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Service;
import org.springframework.stereotype.Service;

@Service
public class MediaService {
    MediaRepository mediaRepository;
    R2Service r2Service;

    public MediaService(MediaRepository mediaRepository, R2Service r2Service) {
        this.mediaRepository = mediaRepository;
        this.r2Service = r2Service;
    }

    // Implement methods for media management, such as upload, download, delete, etc.
    // Example method to upload media
    public void uploadMedia(String fileName, byte[] data, String contentType) {
        // Logic to upload media using R2Service
        r2Service.uploadFile(fileName,data, contentType);
        // Create a MediaAsset object (assuming it exists in your domain model)
        // MediaAsset mediaAsset = new MediaAsset(fileName, data, contentType);
        // Save the media asset to the repository
        // Optionally, save media metadata to the repository
        // mediaRepository.saveMedia(mediaAsset);
    }

}
