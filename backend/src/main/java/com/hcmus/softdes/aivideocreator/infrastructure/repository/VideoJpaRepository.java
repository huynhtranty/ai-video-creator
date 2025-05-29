package com.hcmus.softdes.aivideocreator.infrastructure.repository;

import com.hcmus.softdes.aivideocreator.domain.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VideoJpaRepository extends JpaRepository<Video, UUID> {
     List<Video> findByUserId(UUID userId);
}
