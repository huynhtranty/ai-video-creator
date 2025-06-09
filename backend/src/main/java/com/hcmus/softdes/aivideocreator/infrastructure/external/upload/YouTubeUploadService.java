package com.hcmus.softdes.aivideocreator.infrastructure.external.upload;

import com.google.api.client.util.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject;

@Service
public class YouTubeUploadService {

    @Value("${youtube.access.token}")
    private String accessToken;

    private static final String UPLOAD_URL = "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable";
    private static final String META_URL = "https://www.googleapis.com/youtube/v3/videos?part=snippet,status";

    public String uploadVideo(File videoFile, String title, String description) throws Exception {
        // 1. Prepare metadata
        JSONObject metadata = new JSONObject();
        JSONObject snippet = new JSONObject();
        snippet.put("title", title);
        snippet.put("description", description);
        snippet.put("categoryId", "22");
        metadata.put("snippet", snippet);

        JSONObject status = new JSONObject();
        status.put("privacyStatus", "public");
        metadata.put("status", status);

        // 2. Initiate resumable upload
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest initRequest = HttpRequest.newBuilder()
                .uri(URI.create(UPLOAD_URL))
                .header("Authorization", "Bearer " + accessToken)
                .header("Content-Type", "application/json; charset=UTF-8")
                .header("X-Upload-Content-Type", "video/*")
                .POST(HttpRequest.BodyPublishers.ofString(metadata.toString()))
                .build();

        HttpResponse<Void> initResponse = client.send(initRequest, HttpResponse.BodyHandlers.discarding());
        String uploadUrl = initResponse.headers().firstValue("Location").orElseThrow();

        // 3. Upload video data
        HttpRequest uploadRequest = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl))
                .header("Authorization", "Bearer " + accessToken)
                .header("Content-Type", "video/*")
                .PUT(HttpRequest.BodyPublishers.ofFile(videoFile.toPath()))
                .build();

        HttpResponse<String> uploadResponse = client.send(uploadRequest, HttpResponse.BodyHandlers.ofString());

        return uploadResponse.body(); // Contains video ID and metadata
    }

    public JSONObject getYouTubeVideoStats(String videoId) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=" + videoId))
                .header("Authorization", "Bearer " + accessToken)
                .GET()
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return new JSONObject(response.body());
    }

}
