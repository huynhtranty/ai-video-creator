package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.service.UserService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.upload.TikTokUploadService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.upload.YouTubeUploadService;
import com.google.api.client.auth.oauth2.Credential;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("/upload")
public class UploadController {

    private final YouTubeUploadService youtubeService;
    private final TikTokUploadService tiktokService;
    private final UserService authService;

    @Autowired
    public UploadController(YouTubeUploadService youtubeService,
                            TikTokUploadService tiktokService,
                            UserService authService) {
        this.youtubeService = youtubeService;
        this.tiktokService = tiktokService;
        this.authService = authService;
    }

    @PostMapping("/youtube")
    public ResponseEntity<String> uploadToYoutube(@RequestParam("file") MultipartFile file,
                                                  @RequestParam String title,
                                                  @RequestParam String description) throws Exception {
        File tempFile = File.createTempFile("video", ".mp4");
        file.transferTo(tempFile);

        // Obtain Credential (adjust as needed for your auth flow)
//        Credential credential = authService.getCredential();
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String email = authService.findUserByUsername(username).getEmail();
        var accessToken = authService.getGoogleAccessToken(email);

        String result = youtubeService.uploadVideo(tempFile, accessToken, title, description);

        tempFile.delete();

        return ResponseEntity.ok(result);
    }

    @PostMapping("/tiktok")
    public ResponseEntity<String> uploadToTikTok(@RequestParam("file") MultipartFile file,
                                                 @RequestParam String title) throws Exception {
        File tempFile = File.createTempFile("video", ".mp4");
        file.transferTo(tempFile);
        String result = tiktokService.uploadVideo(tempFile, title);
        tempFile.delete();
        return ResponseEntity.ok(result);
    }
}
