package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.entity.User;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "createdAt", target = "creationDate")
    @Mapping(source = "updatedAt", target = "lastModified")
    UserEntity toUserEntity(User user);

    @Mapping(source = "creationDate", target = "createdAt")
    @Mapping(source = "lastModified", target = "updatedAt")
    @Mapping(source = "DOB", target = "dateOfBirth")
    User toDomainUser(UserEntity jpaEntity);
}