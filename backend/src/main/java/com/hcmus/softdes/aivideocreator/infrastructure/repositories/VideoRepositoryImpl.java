package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.VideoRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VideoEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.VideoJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.VideoMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Repository
public class VideoRepositoryImpl implements VideoRepository {
    private VideoJpaRepository videoJpaRepository;

    public VideoRepositoryImpl(VideoJpaRepository videoJpaRepository) {
        this.videoJpaRepository = videoJpaRepository;
    }
    @Override
    public void saveVideo(Video video) {
        // Convert the video path to a
        VideoEntity videoEntity = VideoMapper.toJpaVideoEntity(video);
        VideoEntity savedVideoEntity = videoJpaRepository.save(videoEntity);
    }

    @Override
    public Video getVideoById(UUID videoId) {
        return videoJpaRepository.findById(videoId)
                .map(VideoMapper::toDomainVideo)
                .orElseThrow(() -> new RuntimeException("Video not found"));
    }

    @Override
    public void deleteVideo(UUID videoId) {
        // Convert the video path to a Video entity and delete it
        videoJpaRepository.deleteById(videoId);
    }
    @Override
    public Video getVideo(UUID videoId) {
        return videoJpaRepository.findById(videoId)
                .map(VideoMapper::toDomainVideo)
                .orElseThrow(() -> new RuntimeException("Video not found"));
    }

    @Override
    public List<Video> getVideosByUserId(UUID userId) {
        return videoJpaRepository.findByUserId(userId).stream()
                .map(VideoMapper::toDomainVideo)
                .collect(Collectors.toList());
    }

    @Override
    public List<Video> getVideosByProjectId(UUID projectId) {
        return videoJpaRepository.findByProjectId(projectId).stream()
                .map(VideoMapper::toDomainVideo)
                .collect(Collectors.toList());
    }
}
