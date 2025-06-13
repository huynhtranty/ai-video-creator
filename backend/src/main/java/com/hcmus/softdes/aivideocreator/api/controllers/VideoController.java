package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.api.contracts.auth.VideoResponse;
import com.hcmus.softdes.aivideocreator.api.mappers.VideoMapper;
import com.hcmus.softdes.aivideocreator.application.dto.video.VideoDto;
import com.hcmus.softdes.aivideocreator.application.service.VideoService;
import com.hcmus.softdes.aivideocreator.domain.model.Video;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

import java.util.UUID;


@RestController
@RequestMapping("/api/videos")
public class VideoController {
    VideoService videoService;
    VideoMapper videoMapper = new VideoMapper();

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping
    @Operation(summary = "Create a new video",
            description = "Create a new video with the provided details.")
    public ResponseEntity<VideoDto> createVideo (@RequestBody VideoDto request){
        // check if the request is valid
        if (request.getTitle() == null || request.getDescription() == null) {
            return ResponseEntity.badRequest().build();
        }

        Video videoData = VideoMapper.toVideo(request);
        videoService.createVideo(videoData.getTitle(), videoData.getDescription(), videoData.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(request);
    }
    @GetMapping("/videos/{videoId}")
    @Operation(summary = "Get video by ID",
            description = "Retrieve a video by its unique identifier.")
    public ResponseEntity<VideoDto> getVideo(@PathVariable UUID videoId) {
        Video video = videoService.getVideo(videoId);
        if (video == null) {
            return ResponseEntity.notFound().build();
        }
        VideoDto videoDto = VideoMapper.toVideoDto(video);
        return ResponseEntity.ok(videoDto);
    }

    @GetMapping("/videos")
    @Operation(summary = "Get all videos",
            description = "Retrieve all videos associated with the user.")
    public ResponseEntity<VideoDto[]> getAllVideos() {
        VideoDto[] videoResponses = videoService.getVideosByUserId(null).stream()
                .map(VideoMapper::toVideoDto)
                .toArray(VideoDto[]::new);
        if (videoResponses.length == 0) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(videoResponses);
    }

    @DeleteMapping("/videos/{videoId}")
    @Operation(summary = "Delete video by ID",
            description = "Delete a video by its unique identifier.")
    public ResponseEntity<Void> deleteVideo(@PathVariable UUID videoId) {
        // Logic to delete a video by its ID
        try {
            videoService.deleteVideo(videoId);
        } catch (RuntimeException e) {
            // If the video is not found, return 404 Not Found
            return ResponseEntity.notFound().build();
        }
        // If deletion is successful, return 204 No Content
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/analytics")
    public ResponseEntity<String> getAnalytics() {
        // Logic to retrieve analytics data
        String analyticsData = "Analytics data"; // Replace with actual retrieval logic
        return ResponseEntity.ok(analyticsData);
    }
}
