package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.api.contracts.auth.AuthResponse;
import com.hcmus.softdes.aivideocreator.application.service.UserService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.upload.TikTokUploadService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.upload.YouTubeUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/upload")
public class UploadController {

    private final YouTubeUploadService youtubeService;
    private final TikTokUploadService tiktokService;

    @Autowired
    private UserService authService;

    private String accessToken;

    public UploadController(YouTubeUploadService youtubeService, TikTokUploadService tiktokService) {
        this.youtubeService = youtubeService;
        this.tiktokService = tiktokService;
//        this.accessToken = UserService.getAccessToken(); // Assuming UserService has a method to get access token
    }

    @PostMapping("/youtube")
    public ResponseEntity<String> uploadToYoutube(@RequestParam("file") MultipartFile file,
                                                  @RequestParam String title,
                                                  @RequestParam String description) throws Exception {
        File tempFile = File.createTempFile("video", ".mp4");
        file.transferTo(tempFile);
        String result = youtubeService.uploadVideo(tempFile, title, description, accessToken);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/tiktok")
    public ResponseEntity<String> uploadToTikTok(@RequestParam("file") MultipartFile file,
                                                 @RequestParam String title) throws Exception {
        File tempFile = File.createTempFile("video", ".mp4");
        file.transferTo(tempFile);
        String result = tiktokService.uploadVideo(tempFile, title);
        return ResponseEntity.ok(result);
    }
}
