
package com.hcmus.softdes.aivideocreator.application.common.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.User;

import java.util.List;
import java.util.UUID;

public interface UserRepository {
    List<User> findAllUsers();
    void saveUser(User user);
    User findUserById(UUID userId);
    User findUserByUsername(String username);
    void updateUser(UUID userId, User user);
    void deleteUser(UUID userId);
}
