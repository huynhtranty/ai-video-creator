package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.domain.model.User;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.UserEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.UserJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.UserMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository jpaRepository;

    public UserRepositoryImpl(UserJpaRepository userJpaRepository) {
        this.jpaRepository = userJpaRepository;
    }

    @Override
    public List<User> findAllUsers() {
        return jpaRepository.findAll().stream()
                .map(UserMapper::toDomainUser)
                .toList();
    }

    @Override
    public void saveUser(User user) {
        UserEntity userEntity = UserMapper.toUserEntity(user);
        userEntity.setPassword(user.getPassword());
        jpaRepository.save(userEntity);
    }

    @Override
    public User findUserById(UUID userId) {
        return jpaRepository.findById(userId)
                .map(UserMapper::toDomainUser)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User findUserByUsername(String username) {
        return jpaRepository.findByUsername(username)
                .map(UserMapper::toDomainUser)
                .stream().findFirst()
                .orElse(null);
    }

    @Override
    public User findUserByEmail(String email) {
        return jpaRepository.findByEmail(email)
                .map(UserMapper::toDomainUser)
                .stream().findFirst()
                .orElse(null);
    }

    @Override
    public void updateUser(UUID userId, User user) {
        UserEntity existingUser = jpaRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setFullname(user.getFullname());
        existingUser.setPassword(user.getPassword());
        existingUser.setDOB(user.getDateOfBirth());

        jpaRepository.save(existingUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        jpaRepository.deleteById(userId);
    }
}
