package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.VideoRepository;
import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import com.hcmus.softdes.aivideocreator.domain.model.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Client;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VideoService {
    private final VideoRepository videoRepository;
//    private final AssestmentRepository assignmentRepository;
    private R2Client r2Client;


    public VideoService(VideoRepository videoRepository, R2Client r2Client) {
        this.r2Client = r2Client;
        this.videoRepository = videoRepository;
        if (videoRepository == null) {
            throw new IllegalArgumentException("VideoRepository cannot be null");
        }
        if (r2Client == null) {
            throw new IllegalArgumentException("R2Client cannot be null");
        }
        // this.assignmentRepository = null; // Assuming assignmentRepository is not used in this service
    }

    public Video createVideo(String title, String description, String filePath, Status status, Platform platform, Integer duration, UUID projectId, UUID userId) {
        if (title == null || description == null || filePath == null || userId == null) {
            throw new IllegalArgumentException("Video title, description, file path, and user ID cannot be null");
        }

        // Create a new Video object with the provided details
        Video videoData = Video.builder()
                .id(UUID.randomUUID())
                .title(title)
                .description(description)
                .filePath(filePath)
                .status(status != null ? status : Status.COMPLETED)
                .platform(platform != null ? platform : Platform.NONE)
                .duration(duration != null ? duration : 0)
                .projectId(projectId)
                .userId(userId)
                .createdAt(java.time.LocalDateTime.now())
                .updatedAt(java.time.LocalDateTime.now())
                .build();

        videoRepository.saveVideo(videoData);
        
        // Verify the video was saved
        Video savedVideo = videoRepository.getVideo(videoData.getId());
        if (savedVideo == null) {
            throw new RuntimeException("Failed to create video");
        }
        
        return savedVideo;
    }

    // Keep the old method for backward compatibility
    public void createVideo(String title, String description, UUID userId) {
        createVideo(title, description, null, Status.PENDING, Platform.NONE, 0, null, userId);
    }

    public Video getVideo(UUID videoId) {
        Video video = videoRepository.getVideo(videoId);
        if (video == null) {
            throw new RuntimeException("Video not found");
        }
        return video;
    }

    public void deleteVideo(UUID videoId) {
        if (videoId == null) {
            throw new IllegalArgumentException("Video ID cannot be null");
        }
        videoRepository.deleteVideo(videoId);
        r2Client.deleteVideo(videoId.toString());
        if (videoRepository.getVideo(videoId) != null) {
            throw new RuntimeException("Failed to delete video");
        }
    }

    public List<Video> getVideosByUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        return videoRepository.getVideosByUserId(userId);
    }
}
