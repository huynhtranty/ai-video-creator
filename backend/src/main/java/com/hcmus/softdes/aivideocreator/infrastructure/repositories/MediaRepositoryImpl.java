package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.MediaEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.MediaJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.MediaMapper;
import lombok.Locked;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class MediaRepositoryImpl implements MediaRepository {
    MediaJpaRepository mediaJpaRepository;

    public MediaRepositoryImpl(MediaJpaRepository mediaJpaRepository) {
        this.mediaJpaRepository = mediaJpaRepository;
    }

    @Override
    public void saveMedia(MediaAsset media) {
        MediaEntity mediaEntity = MediaMapper.toMediaEntity(media);
        mediaJpaRepository.save(mediaEntity);
    }

    @Override
    public MediaAsset findMediaById(UUID mediaId) {
        return mediaJpaRepository.findById(mediaId)
                .map(MediaMapper::toDomainMedia)
                .orElse(null);
    }

    @Override
    public void updateMedia(UUID mediaId, MediaAsset media) {
        MediaEntity mediaEntity = MediaMapper.toMediaEntity(media);
        mediaEntity.setId(mediaId); // Ensure the ID is set for the update
        if (mediaJpaRepository.existsById(mediaId)) {
            mediaJpaRepository.save(mediaEntity);
        } else {
            throw new IllegalArgumentException("Media with ID " + mediaId + " does not exist.");
        }
    }

    @Override
    public void deleteMedia(UUID mediaId) {
        if (mediaJpaRepository.existsById(mediaId)) {
            mediaJpaRepository.deleteById(mediaId);
        } else {
            throw new IllegalArgumentException("Media with ID " + mediaId + " does not exist.");
        }
    }

    @Override
    public MediaAsset findMediaByScriptId(UUID scriptId) {
        MediaEntity mediaEntity = mediaJpaRepository.findByScriptId(scriptId);
        if (mediaEntity != null) {
            return MediaMapper.toDomainMedia(mediaEntity);
        }
        return null;
    }
    @Override
    public MediaAsset findMediaByProjectId(UUID projectId) {
        MediaEntity mediaEntity = mediaJpaRepository.findByProjectId(projectId);
        if (mediaEntity != null) {
            return MediaMapper.toDomainMedia(mediaEntity);
        }
        return null;
    }
}
