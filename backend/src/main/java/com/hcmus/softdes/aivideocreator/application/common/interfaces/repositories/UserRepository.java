package com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories;

import com.hcmus.softdes.aivideocreator.domain.user.User;

import java.util.List;
import java.util.UUID;

public interface UserRepository {
    List<User> findAllUsers();
    void saveUser(User user);
    User findUserById(UUID userId);
    User findUserByUsername(String username);
    User findUserByEmail(String email);
    void updateUser(UUID userId, User user);
    void deleteUser(UUID userId);
}
