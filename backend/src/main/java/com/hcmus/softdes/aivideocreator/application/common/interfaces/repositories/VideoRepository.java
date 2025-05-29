package com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories;

import com.hcmus.softdes.aivideocreator.domain.entity.Video;

import java.util.List;
import java.util.UUID;

public interface VideoRepository {
    /**
     * Saves the video to the repository.
     *
     * @param videoPath The path to the video file.
     * @return The saved video path.
     */
    void saveVideo(String videoPath);

    /**
     * Deletes the video from the repository.
     *
     * @param videoId The path to the video file to be deleted.
     */
    void deleteVideo(UUID videoId);

    /**
     * Retrieves the video from the repository.
     *
     * @param videoId The ID of the video to retrieve.
     * @return The path to the retrieved video file.
     */
    Video getVideo(UUID videoId);

    /**
     * Retrieves all videos associated with a specific user.
     *
     * @param userId The ID of the user whose videos are to be retrieved.
     * @return A list of video paths associated with the user.
     */
    List<Video> getVideosByProjectId(UUID userId);

}
