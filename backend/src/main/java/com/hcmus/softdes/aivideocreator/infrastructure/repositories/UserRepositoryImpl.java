package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.domain.entity.User;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.UserEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.UserJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.UserMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class UserRepositoryImpl implements UserRepository {
    private final UserJpaRepository jpaRepository;
    private final BCryptPasswordEncoder encoder;
    private final UserMapper userMapper;

    public UserRepositoryImpl(UserJpaRepository userJpaRepository, UserMapper userMapper) {
        this.encoder = new BCryptPasswordEncoder();
        this.jpaRepository = userJpaRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<User> findAllUsers() {
        return jpaRepository.findAll().stream()
                .map(userMapper::toDomainUser)
                .toList();
    }

    @Override
    public void saveUser(User user) {
        UserEntity userEntity = userMapper.toUserEntity(user);
        userEntity.setPassword(encoder.encode(user.getPassword()));
        jpaRepository.save(userEntity);
    }

    @Override
    public User findUserById(UUID userId) {
        return jpaRepository.findById(userId)
                .map(userMapper::toDomainUser)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User findUserByUsername(String username) {
        return jpaRepository.findByUsername(username)
                .map(userMapper::toDomainUser)
                .stream().findFirst()
                .orElse(null);
    }

    @Override
    public void updateUser(UUID userId, User user) {
        UserEntity existingUser = jpaRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(encoder.encode(user.getPassword()));
        existingUser.setDOB(user.getDateOfBirth());

        jpaRepository.save(existingUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        jpaRepository.deleteById(userId);
    }
}