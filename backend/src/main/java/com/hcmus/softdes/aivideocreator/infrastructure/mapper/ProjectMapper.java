package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.entity.Project;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ProjectEntity;

public class ProjectMapper {

    public static ProjectEntity toJpaEntity(Project domainProject) {
        if (domainProject == null) {
            return null;
        }
        return ProjectEntity.builder()
                .id(domainProject.getId())
                .userId(domainProject.getUserId())
                .name(domainProject.getName())
                .creationDate(domainProject.getCreatedAt())
                .lastModified(domainProject.getUpdatedAt())
                .build();
    }

    public static Project toDomainEntity(ProjectEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }

        return Project.builder()
                .id(jpaEntity.getId())
                .createdAt(jpaEntity.getCreationDate())
                .updatedAt(jpaEntity.getLastModified())
                .userId(jpaEntity.getUserId())
                .name(jpaEntity.getName())
                .createdAt(jpaEntity.getCreationDate())
                .updatedAt(jpaEntity.getLastModified())
                .build();
    }
}