package com.hcmus.softdes.aivideocreator.application.common.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;

import javax.print.attribute.standard.Media;
import java.util.UUID;

public interface MediaRepository {
     void saveMedia(MediaAsset media);
     MediaAsset findMediaById(UUID mediaId);
     void updateMedia(UUID mediaId, MediaAsset media);
     void deleteMedia(UUID mediaId);
}
