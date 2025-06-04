package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.request.VideoRequestDTO;
import com.hcmus.softdes.aivideocreator.application.dto.response.VideoResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api/dashboard")
public class VideoController {
    @PostMapping
    public ResponseEntity<VideoResponseDTO> createVideo (@RequestBody VideoRequestDTO request){

        return ResponseEntity.status(HttpStatus.CREATED).body(new VideoResponseDTO());
    }
    @GetMapping("/videos/{videoId}")
    @Operation(summary = "Get video by ID",
            description = "Retrieve a video by its unique identifier.")
    public ResponseEntity<VideoResponseDTO> getVideo(@PathVariable String videoId) {
        // Logic to retrieve the video by ID
        VideoResponseDTO videoResponse = new VideoResponseDTO(); // Replace with actual retrieval logic
        return ResponseEntity.ok(videoResponse);
    }

    @GetMapping("/videos")
    public ResponseEntity<VideoResponseDTO[]> getAllVideos() {
        // Logic to retrieve all videos
        VideoResponseDTO[] videoResponses = new VideoResponseDTO[0]; // Replace with actual retrieval logic
        return ResponseEntity.ok(videoResponses);
    }

    @DeleteMapping("/videos/{videoId}")
    public ResponseEntity<Void> deleteVideo(@PathVariable String videoId) {
        // Logic to delete the video by ID
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
