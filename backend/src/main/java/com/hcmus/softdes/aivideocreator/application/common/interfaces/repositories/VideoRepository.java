package com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.Video;

import java.util.List;
import java.util.UUID;

public interface VideoRepository {

    void saveVideo(Video video);
    void deleteVideo(UUID videoId);
    Video getVideo(UUID videoId);

    List<Video> getVideosByUserId(UUID userId);
    List<Video> getVideosByProjectId(UUID projectId);
    Video getVideoById(UUID videoId);

}
