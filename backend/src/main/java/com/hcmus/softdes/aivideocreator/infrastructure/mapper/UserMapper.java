package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.user.User;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.UserEntity;

public class UserMapper {

    public static UserEntity toUserEntity(User user) {
        if (user == null) {
            return null;
        }
        return UserEntity.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .username(user.getUsername())
                .creationDate(user.getCreatedAt())
                .lastModified(user.getUpdatedAt())
                .build();
    }

    public static User toDomainUser(UserEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }
        return User.builder()
                .id(jpaEntity.getId())
                .username(jpaEntity.getUsername())
                .email(jpaEntity.getEmail())
                .password(jpaEntity.getPassword())
                .dateOfBirth(jpaEntity.getDOB())
                .createdAt(jpaEntity.getCreationDate())
                .updatedAt(jpaEntity.getLastModified())
                .build();
    }
}
