package com.hcmus.softdes.aivideocreator.infrastructure.repositories;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ProjectRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ProjectEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.ProjectMapper;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.ProjectJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class ProjectRepositoryImpl implements ProjectRepository {

    private final ProjectJpaRepository jpaRepository;

    public ProjectRepositoryImpl(ProjectJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Project save(Project project) {
        ProjectEntity entity = ProjectMapper.toJpaEntity(project);
        ProjectEntity saved = jpaRepository.save(entity);
        return ProjectMapper.toDomainEntity(saved);
    }

    @Override
    public Optional<Project> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(ProjectMapper::toDomainEntity);
    }

    @Override
    public List<Project> findByUserId(UUID userId) {
        return jpaRepository.findByUserId(userId).stream()
                .map(ProjectMapper::toDomainEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<Project> findRecentProjectsByUserId(UUID userId) {
        return jpaRepository.findByUserIdOrderByLastModifiedDesc(userId).stream()
                .limit(5)
                .map(ProjectMapper::toDomainEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public Optional<Project> findByProjectName(String name) {
        return jpaRepository.findByName(name)
                .map(ProjectMapper::toDomainEntity);
    }
    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }
}