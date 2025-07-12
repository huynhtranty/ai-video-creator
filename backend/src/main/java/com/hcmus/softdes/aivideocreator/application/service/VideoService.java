package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.VideoRepository;
import com.hcmus.softdes.aivideocreator.application.dto.video.VideoDto;
import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.domain.model.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Client;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VideoService {
    private final VideoRepository videoRepository;
    private final ScriptRepository scriptRepository;
    private final MediaRepository mediaRepository;
    private R2Client r2Client;


    public VideoService(VideoRepository videoRepository, ScriptRepository scriptRepository, MediaRepository mediaRepository, R2Client r2Client) {
        this.r2Client = r2Client;
        this.videoRepository = videoRepository;
        this.scriptRepository = scriptRepository;
        this.mediaRepository = mediaRepository;
        if (videoRepository == null) {
            throw new IllegalArgumentException("VideoRepository cannot be null");
        }
        if (scriptRepository == null) {
            throw new IllegalArgumentException("ScriptRepository cannot be null");
        }
        if (mediaRepository == null) {
            throw new IllegalArgumentException("MediaRepository cannot be null");
        }
        if (r2Client == null) {
            throw new IllegalArgumentException("R2Client cannot be null");
        }
    }

    public Video createVideo(String title, String description, String filePath, Status status, Platform platform, Integer duration, UUID projectId, UUID userId) {
        if (title == null || description == null || filePath == null || userId == null) {
            throw new IllegalArgumentException("Video title, description, file path, and user ID cannot be null");
        }

        // Get thumbnail URL from project's first image if projectId is provided
        String thumbnailUrl = null;
        if (projectId != null) {
            List<Script> scripts = scriptRepository.findScriptsByProjectId(projectId);
            if (!scripts.isEmpty()) {
                MediaAsset media = mediaRepository.findMediaByScriptId(scripts.get(0).getId());
                thumbnailUrl = media != null ? media.getUrl() : null;
            }
        }

        // Create a new Video object with the provided details
        Video videoData = Video.builder()
                .id(UUID.randomUUID())
                .title(title)
                .description(description)
                .filePath(filePath)
                .status(status != null ? status : Status.COMPLETED)
                .youtubeId(null) // YouTube ID is optional, set to null if not provided
                .thumbnailUrl(thumbnailUrl)
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
        
        // Check if video exists before attempting deletion
        Video existingVideo = videoRepository.getVideo(videoId);
        if (existingVideo == null) {
            throw new RuntimeException("Video not found with ID: " + videoId);
        }
        
        // Delete from database first
        videoRepository.deleteVideo(videoId);
        
        // Delete from R2 storage
        try {
            r2Client.deleteVideo(videoId.toString());
        } catch (Exception e) {
            // Log error but don't fail the deletion if R2 deletion fails
            System.err.println("Warning: Failed to delete video from R2 storage: " + e.getMessage());
        }
    }

    public List<Video> getVideosByUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        return videoRepository.getVideosByUserId(userId);
    }

    //update video status
    public Video updateVideo(VideoDto videoDto) {
        if (videoDto == null || videoDto.getId() == null) {
            throw new IllegalArgumentException("VideoDto and Video ID cannot be null");
        }

        Video existingVideo = videoRepository.getVideo(videoDto.getId());
        if (existingVideo == null) {
            throw new RuntimeException("Video not found");
        }

        // Update the fields of the existing video
        existingVideo.setTitle(videoDto.getTitle());
        existingVideo.setDescription(videoDto.getDescription());
        existingVideo.setFilePath(videoDto.getFilePath());
        existingVideo.setStatus(videoDto.getStatus());
        existingVideo.setPlatform(videoDto.getPlatform());
        existingVideo.setDuration(videoDto.getDuration());

        // Save the updated video
        videoRepository.saveVideo(existingVideo);

        return existingVideo;
    }

    public void saveYouTubeVideoId(String youtubeVideoId, UUID videoId) {
        if (youtubeVideoId == null || youtubeVideoId.isEmpty()) {
            throw new IllegalArgumentException("YouTube video ID cannot be null or empty");
        }
        if (videoId == null) {
            throw new IllegalArgumentException("Video ID cannot be null");
        }
        Video video = videoRepository.getVideo(videoId);
        if (video == null) {
            throw new RuntimeException("Video not found for ID: " + videoId);
        }
        video.setYoutubeId(youtubeVideoId);
        video.setPlatform(Platform.YOUTUBE);
        videoRepository.saveVideo(video);
    }
}
