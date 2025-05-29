package com.hcmus.softdes.aivideocreator.domain.repositories;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.VideoRepository;
import com.hcmus.softdes.aivideocreator.domain.entity.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.repository.VideoJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.VideoMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Repository
public class VideoRepositoryImpl implements VideoRepository {
    private VideoJpaRepository videoJpaRepository;

    public VideoRepositoryImpl(VideoJpaRepository videoJpaRepository) {
        this.videoJpaRepository = videoJpaRepository;
    }
    @Override
    public void saveVideo(String videoPath) {

    }

    @Override
    public void deleteVideo(UUID videoId) {
        // Convert the video path to a Video entity and delete it
        videoJpaRepository.deleteById(videoId);
    }
    @Override
    public Video getVideo(UUID videoId) {
        return videoJpaRepository.findById(videoId).orElse(null);
    }
    @Override
    public List<Video> getVideosByProjectId(UUID projectId) {
        // Retrieve all videos for the user and convert them to paths
//        return videoJpaRepository.findByProjectId(projectId)
//                .stream()
////                .map(VideoMapper::toDomainEntity)
//                .collect(Collectors.toList());
        return null;
    }

}
