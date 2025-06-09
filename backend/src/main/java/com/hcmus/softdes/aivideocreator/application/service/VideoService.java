package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.VideoRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Video;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VideoService {
    private VideoRepository videoRepository;

    public VideoService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    public void createVideo(Video videoData) {
        if (videoData == null) {
            throw new IllegalArgumentException("Video data cannot be null");
        }
        if (videoData.getTitle() == null || videoData.getDescription() == null || videoData.getFilePath() == null) {
            throw new IllegalArgumentException("Video title, description, and file path cannot be null");
        }
        videoRepository.saveVideo(videoData);
        if (videoRepository.getVideo(videoData.getId()) == null) {
            throw new RuntimeException("Failed to create video");
        }
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
