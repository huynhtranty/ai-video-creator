package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.api.mappers.VideoMapper;
import com.hcmus.softdes.aivideocreator.application.common.exceptions.YouTubeServiceException;
import com.hcmus.softdes.aivideocreator.application.dto.video.VideoDto;
import com.hcmus.softdes.aivideocreator.application.dto.video.VideoStats;
import com.hcmus.softdes.aivideocreator.application.service.UserService;
import com.hcmus.softdes.aivideocreator.application.service.VideoService;
import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import com.hcmus.softdes.aivideocreator.domain.model.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.external.upload.YouTubeUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/videos")
public class VideoController {
    VideoService videoService;
    YouTubeUploadService youtubeService;
    UserService authService;
    VideoMapper videoMapper = new VideoMapper();

    public VideoController(VideoService videoService, YouTubeUploadService youtubeService, UserService userService) {
        this.videoService = videoService;
        this.youtubeService = youtubeService;
        this.authService = userService;
    }

    @PostMapping
    @Operation(summary = "Create a new video",
            description = "Create a new video with the provided details.")
    public ResponseEntity<VideoDto> createVideo (@RequestBody VideoDto request){
        // check if the request is valid
        if (request.getTitle() == null || request.getFilePath() == null) {
            return ResponseEntity.badRequest().build();
        }

        UUID userId;
        try {
            // Try to get user ID from security context first
            String authDetails = SecurityContextHolder.getContext().getAuthentication().getDetails().toString();
            userId = UUID.fromString(authDetails);
        } catch (Exception e) {
            // If security context fails, use the user ID from request or a default
            if (request.getUserId() != null) {
                userId = request.getUserId();
            } else {
                // For development/testing, use a default user ID
                userId = UUID.fromString("00000000-0000-0000-0000-000000000001");
            }
        }
        
        // Create video using the new method
        Video createdVideo = videoService.createVideo(
            request.getTitle(), 
            request.getDescription(),
            request.getFilePath(),
            request.getStatus(),
            request.getPlatform(),
            request.getDuration(),
            request.getProjectId(),
            userId
        );
        
        // Convert to DTO and return
        VideoDto responseDto = VideoMapper.toVideoDto(createdVideo);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }
    @GetMapping("/{videoId}")
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

    @GetMapping
    @Operation(summary = "Get all videos",
            description = "Retrieve all videos associated with the user.")
    public ResponseEntity<List<VideoDto>> getAllVideos() {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getDetails().toString());
        List<VideoDto> videoResponses = videoService.getVideosByUserId(userId).stream()
                .map(VideoMapper::toVideoDto)
                .toList();

        if (videoResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(videoResponses);
    }

    @DeleteMapping("/{videoId}")
    @Operation(summary = "Delete video by ID",
            description = "Delete a video by its unique identifier.")
    public ResponseEntity<Void> deleteVideo(@PathVariable UUID videoId) {
        System.out.println("Delete video endpoint called with videoId: " + videoId);
        try {
            videoService.deleteVideo(videoId);
            System.out.println("Video deleted successfully: " + videoId);
            // If deletion is successful, return 204 No Content
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            System.err.println("Error deleting video " + videoId + ": " + e.getMessage());
            e.printStackTrace();
            // If the video is not found, return 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{videoId}/status")
    @Operation(summary = "Update video status",
            description = "Update the status of a video by its unique identifier.")
    public ResponseEntity<VideoDto> updateVideoStatus(@PathVariable UUID videoId, @RequestParam Status status,
                                                      @RequestParam(required = false) Platform platform,
                                                      @RequestParam(required = false) String title,
                                                      @RequestParam(required = false) String description) {
        try {
            Video video = videoService.getVideo(videoId);
            if (video == null) {
                return ResponseEntity.notFound().build();
            }

            // Update video details
            if (title != null) {
                video.setTitle(title);
            }
            if (description != null) {
                video.setDescription(description);
            }
            video.setStatus(status);
            if (platform != null) {
                video.setPlatform(platform);
            }

            Video updatedVideo = videoService.updateVideo(videoMapper.toVideoDto(video));
            VideoDto responseDto = videoMapper.toVideoDto(updatedVideo);
            return ResponseEntity.ok(responseDto);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/youtube/{youtubeId}/analytics")
    @Operation(summary = "Get YouTube video analytics",
            description = "Retrieve analytics for a YouTube video by its YouTube ID.")
    public ResponseEntity<VideoStats> getAnalytics(@PathVariable String youtubeId) {
        System.out.println("Analytics endpoint called with YouTube ID: " + youtubeId);
        
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            System.out.println("Username from security context: " + username);
            String email = authService.findUserByUsername(username).getEmail();
            System.out.println("Email found: " + email);
            var accessToken = authService.getGoogleAccessToken(email);
            System.out.println("Access token retrieved: " + (accessToken != null ? "✓" : "✗"));
            VideoStats stats = youtubeService.getYouTubeVideoStats(youtubeId, accessToken);
            System.out.println("Stats retrieved successfully");
            return ResponseEntity.ok(stats);
        } catch (YouTubeServiceException e) {
            System.err.println("YouTubeServiceException: " + e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("General exception: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/youtube/{youtubeId}/test")
    public ResponseEntity<String> testEndpoint(@PathVariable String youtubeId) {
        System.out.println("Test endpoint called with YouTube ID: " + youtubeId);
        return ResponseEntity.ok("Test endpoint working for YouTube ID: " + youtubeId);
    }
    
    @GetMapping("/youtube-test")
    public ResponseEntity<String> simpleTestEndpoint() {
        System.out.println("Simple test endpoint called");
        return ResponseEntity.ok("Simple test endpoint working");
    }

    @GetMapping("/stats")
    @Operation(summary = "Get overall video statistics",
            description = "Retrieve overall statistics for all user videos.")
    public ResponseEntity<List<VideoStats>> getOverallStats() {
        try {
            UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getDetails().toString());
            List<Video> videos = videoService.getVideosByUserId(userId);
            if (videos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<VideoStats> videoStatsList = youtubeService.getYouTubeVideoStatsBatch(
                    videos.stream().map(Video::getYoutubeId).toList(),
                    userId.toString()
            );
            return ResponseEntity.ok(videoStatsList);
        } catch (Exception e) {
            System.err.println("Error getting video stats: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
