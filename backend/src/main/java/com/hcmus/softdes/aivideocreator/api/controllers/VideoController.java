package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.request.VideoRequestDTO;
import com.hcmus.softdes.aivideocreator.application.dto.response.VideoResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/videos")
public class VideoController {
    // This controller will handle video-related endpoints in the future

@ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
public String notImplemented() {
    return "This endpoint is not implemented yet.";
}
// Add methods for video creation, retrieval, deletion, etc. as needed
// For example:
 @PostMapping
 public ResponseEntity<VideoResponseDTO> createVideo(@RequestBody VideoRequestDTO request) {

        // Logic to create a video
        return ResponseEntity.status(HttpStatus.CREATED).body(new VideoResponseDTO());
    }

    // Other methods for video management can be added here
}
