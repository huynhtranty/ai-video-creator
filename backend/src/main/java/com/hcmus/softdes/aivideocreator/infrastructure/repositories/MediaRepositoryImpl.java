package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import lombok.Locked;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class MediaRepositoryImpl implements MediaRepository {

    // Implement methods from MediaRepository interface
    // For example:
    // @Override
    // public List<Media> findAllMedia() {
    //     // Implementation logic here
    //     return null;
    // }

    @Override
    public void saveMedia(MediaAsset media) {
        // Implementation logic here
    }

    @Override
    public MediaAsset findMediaById(UUID mediaId) {
        // Implementation logic here
        return null;
    }

    @Override
    public void updateMedia(UUID mediaId, MediaAsset media) {
        // Implementation logic here
    }

    @Override
    public void deleteMedia(UUID mediaId) {
        // Implementation logic here
    }
}
