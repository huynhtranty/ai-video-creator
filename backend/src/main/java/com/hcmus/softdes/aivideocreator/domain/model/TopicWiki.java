package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
@Setter
public class TopicWiki extends Entity {
    private String topicName;
    private String snippet;
    private int popularityScore;

    public TopicWiki(UUID id, LocalDateTime createAt, LocalDateTime updateAt, String topicName, String snippet, int popularityScore) {
        super(id, createAt, updateAt);
        this.topicName = topicName;
        this.snippet = snippet;
        this.popularityScore = popularityScore;
    }
    public static TopicWiki create(String topicName, String snippet, int popularityScore) {
        return new TopicWiki(
            UUID.randomUUID(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            topicName,
            snippet,
            popularityScore
        );
    }
}
