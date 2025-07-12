package com.hcmus.softdes.aivideocreator.infrastructure.external.upload;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.http.InputStreamContent;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;
import com.google.api.services.youtube.model.VideoSnippet;
import com.google.api.services.youtube.model.VideoStatistics;
import com.google.api.services.youtube.model.VideoStatus;
import com.hcmus.softdes.aivideocreator.application.common.exceptions.YouTubeServiceException;
import com.hcmus.softdes.aivideocreator.application.dto.video.VideoStats;
import org.springframework.stereotype.Service;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.util.Collections;

@Service
public class YouTubeUploadService {

    private final YouTube youtube;

    public YouTubeUploadService(YouTube youtube) {
        this.youtube = youtube;
    }

    public String uploadVideo(File videoFile, String credential, String title, String description) throws Exception {
        Video videoObject = new Video();
        VideoStatus status = new VideoStatus();
        status.setPrivacyStatus("public");
        videoObject.setStatus(status);

        VideoSnippet snippet = new VideoSnippet();
        snippet.setTitle(title);
        snippet.setDescription(description);
        snippet.setCategoryId("22");
        videoObject.setSnippet(snippet);

        InputStreamContent mediaContent = new InputStreamContent(
                "video/*",
                new BufferedInputStream(new FileInputStream(videoFile))
        );
        mediaContent.setLength(videoFile.length());

        YouTube.Videos.Insert videoInsert = youtube.videos().insert(
                Collections.singletonList("snippet,status"),
                videoObject,
                mediaContent
        );
        if (credential == null || credential.isEmpty()) {
            throw new IllegalArgumentException("Credential must not be null or empty");
        }

        videoInsert.setOauthToken(credential);

        Video returnedVideo = videoInsert.execute();
        return returnedVideo.getId();
    }

    public VideoStats getYouTubeVideoStats(String videoId, String credential) {
        try {
            if (videoId == null || videoId.isEmpty()) {
                throw new IllegalArgumentException("Video ID must not be null or empty");
            }
            if (credential == null || credential.isEmpty()) {
                throw new IllegalArgumentException("Credential must not be null or empty");
            }

            YouTube.Videos.List request = youtube.videos()
                    .list(Collections.singletonList("snippet,statistics"))
                    .setId(Collections.singletonList(videoId));

            request.setOauthToken(credential);

            VideoListResponse response = request.execute();
            if (response.getItems() == null || response.getItems().isEmpty()) {
                throw new YouTubeServiceException("No video found with the given ID: " + videoId);
            }

            Video video = response.getItems().get(0);
            VideoStatistics stats = video.getStatistics();
            if (stats == null) {
                throw new YouTubeServiceException("Statistics not available for video ID: " + videoId);
            }

            return new VideoStats(
                    stats.getViewCount().longValue(),
                    stats.getLikeCount().longValue(),
                    stats.getCommentCount().longValue()
            );
        } catch (Exception e) {
            throw new YouTubeServiceException("Failed to fetch YouTube statistics", e);
        }
    }
}