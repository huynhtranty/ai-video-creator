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

    public void createVideo(String title, String description, UUID userId) {
        if (title == null || description == null || userId == null) {
            throw new IllegalArgumentException("Video title, description, and file path cannot be null");
        }
//        List<Asset> projectAssets = assetRepository.findByProjectId(projectId);
//        if (projectAssets.isEmpty()) {
//            throw new IllegalArgumentException("No assets found for project ID: " + projectId);
//        }
        // request to API create video
        // Assuming the API returns a video ID or similar identifier
        // Here we create a new Video object with the provided details
        // and save it to the repository
        // This is a placeholder for the actual video creation logic
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
//        MultiPartFile videoGenerated= videoGenerator.generateVideo(title, description, userId);
//        String key = userId.toString() + "/" + title.replaceAll(" ", "_") + ".mp4";
//        String filePath = r2Client.uploadVideo(key, videoGenerated , videoGenerated.getSize());

//        Video videoData = Video.create(title, description, filePath, Status.PENDING, Platform.NONE, 0, null, userId);

//        videoRepository.saveVideo(videoData);
//        if (videoRepository.getVideo(videoData.getId()) == null) {
//            throw new RuntimeException("Failed to create video");
//        }
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
