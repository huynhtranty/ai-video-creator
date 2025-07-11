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
public class TikTokUploadService {

    @Value("${tiktok.access.token}")
    private String accessToken;

    public String uploadVideo(File videoFile, String title) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();

        // 1. Get upload URL
        HttpRequest initRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://open.tiktokapis.com/v2/video/upload/"))
                .header("Authorization", "Bearer " + accessToken)
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> initResponse = client.send(initRequest, HttpResponse.BodyHandlers.ofString());
        JSONObject json = new JSONObject(initResponse.body());
        String uploadUrl = json.getJSONObject("data").getString("upload_url");
        String videoId = json.getJSONObject("data").getString("video_id");

        // 2. Upload actual file
        HttpRequest uploadRequest = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl))
                .header("Content-Type", "video/mp4")
                .PUT(HttpRequest.BodyPublishers.ofFile(videoFile.toPath()))
                .build();

        client.send(uploadRequest, HttpResponse.BodyHandlers.ofString());

        // 3. Publish
        JSONObject publishBody = new JSONObject();
        publishBody.put("video_id", videoId);
        publishBody.put("title", title);

        HttpRequest publishRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://open.tiktokapis.com/v2/video/publish/"))
                .header("Authorization", "Bearer " + accessToken)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(publishBody.toString()))
                .build();

        HttpResponse<String> publishResponse = client.send(publishRequest, HttpResponse.BodyHandlers.ofString());
        return publishResponse.body();
    }
}

