package com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage;

import com.google.api.client.util.Value;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class R2ServiceImpl implements R2Client {

    @Value("${cloudflare.r2.bucket-name}")
    private String bucketName;

    private final S3Client s3Client;

    @Override
    public String uploadVideo(String key, InputStream videoStream, long size) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType("video/mp4")
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(videoStream, size));

        return String.format("https://%s.r2.cloudflarestorage.com/%s", bucketName, key);
    }

    @Override
    public void deleteVideo(String key) {
        s3Client.deleteObject(builder -> builder.bucket(bucketName).key(key));
    }

    @Override
    public boolean videoExists(String key) {
        try {
            s3Client.headObject(builder -> builder.bucket(bucketName).key(key));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public InputStream getVideo(String key) {
        return s3Client.getObject(builder -> builder.bucket(bucketName).key(key));
    }
}
