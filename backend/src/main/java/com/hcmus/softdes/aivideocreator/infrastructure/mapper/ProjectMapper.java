package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.entity.Project;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ProjectEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjectMapper {

    @Mapping(source = "createdAt", target = "creationDate")
    @Mapping(source = "updatedAt", target = "lastModified")
    ProjectEntity toJpaEntity(Project domainProject);

    @Mapping(source = "creationDate", target = "createdAt")
    @Mapping(source = "lastModified", target = "updatedAt")
    Project toDomainEntity(ProjectEntity jpaEntity);
}