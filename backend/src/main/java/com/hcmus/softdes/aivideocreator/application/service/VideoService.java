package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.VideoRepository;
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
        videoRepository.saveVideo(videoData);
    }

    public Video getVideo(UUID videoId) {
        Video video = videoRepository.getVideo(videoId);
        if (video == null) {
            throw new RuntimeException("Video not found");
        }
        return video;
    }

    public void deleteVideo(UUID videoId) {
        videoRepository.deleteVideo(videoId);
    }

    public List<Video> getVideosByUserId(UUID userId) {
        return videoRepository.getVideosByUserId(userId);
    }
}
