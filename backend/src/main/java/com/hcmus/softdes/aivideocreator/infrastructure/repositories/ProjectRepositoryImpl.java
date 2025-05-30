package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.ProjectRepository;
import com.hcmus.softdes.aivideocreator.domain.entity.Project;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ProjectEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.ProjectJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.ProjectMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class ProjectRepositoryImpl implements ProjectRepository {

    private final ProjectJpaRepository jpaRepository;
    private final ProjectMapper projectMapper;

    public ProjectRepositoryImpl(ProjectJpaRepository jpaRepository, ProjectMapper projectMapper) {
        this.jpaRepository = jpaRepository;
        this.projectMapper = projectMapper;
    }

    @Override
    public Project save(Project project) {
        ProjectEntity entity = projectMapper.toJpaEntity(project);
        ProjectEntity saved = jpaRepository.save(entity);
        return projectMapper.toDomainEntity(saved);
    }

    @Override
    public Optional<Project> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(projectMapper::toDomainEntity);
    }

    @Override
    public List<Project> findByUserId(UUID userId) {
        return jpaRepository.findByUserId(userId).stream()
                .map(projectMapper::toDomainEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }
}