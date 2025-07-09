package com.hcmus.softdes.aivideocreator.infrastructure.external.upload;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.InputStreamContent;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.*;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Collections;

@Service
public class YouTubeUploadService {

    private final YouTube youtube;

    // Inject YouTube client (initialize with Credential elsewhere)
    public YouTubeUploadService(YouTube youtube) {
        this.youtube = youtube;
    }

    public String uploadVideo(File videoFile, String credential, String title, String description) throws Exception {
        // Set video metadata
        Video videoObject = new Video();
        VideoStatus status = new VideoStatus();
        status.setPrivacyStatus("public");
        videoObject.setStatus(status);

        VideoSnippet snippet = new VideoSnippet();
        snippet.setTitle(title);
        snippet.setDescription(description);
        snippet.setCategoryId("22");
        videoObject.setSnippet(snippet);

        // Prepare file content
        InputStreamContent mediaContent = new InputStreamContent(
                "video/*",
                new BufferedInputStream(new FileInputStream(videoFile))
        );
        mediaContent.setLength(videoFile.length());

        // Upload
        YouTube.Videos.Insert videoInsert = youtube.videos().insert(
                Collections.singletonList("snippet,status"),
                videoObject,
                mediaContent
        );
//        videoInsert.setOauthToken(credential.getAccessToken());
        videoInsert.setOauthToken(credential);

        Video returnedVideo = videoInsert.execute();
        return "Video Uploaded Successfully. Video ID is " + returnedVideo.getId();
    }

    public VideoStatistics getYouTubeVideoStats(String videoId) throws Exception {
        YouTube.Videos.List request = youtube.videos()
                .list(Collections.singletonList("snippet,statistics"))
                .setId(Collections.singletonList(videoId));
        VideoListResponse response = request.execute();
        if (response.getItems() != null && !response.getItems().isEmpty()) {
            Video video = response.getItems().get(0);
            return video.getStatistics();
        }
        return null;
    }
}