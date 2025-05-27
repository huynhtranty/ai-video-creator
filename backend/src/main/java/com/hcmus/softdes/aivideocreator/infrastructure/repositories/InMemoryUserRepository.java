package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.domain.user.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

// Temporary in-memory user repository for testing purposes
@Repository
public class InMemoryUserRepository implements UserRepository {
    private final List<User> users;

    public InMemoryUserRepository() {
        this.users = new ArrayList<>();

        var encoder = new BCryptPasswordEncoder();
        users.add(User.create(
            "admin",
            "admin@mail.com",
            encoder.encode("123"),
            new Date(2004, 1, 1)
        ));
        users.add(User.create(
            "user",
            "user@mail.com",
            encoder.encode("123"),
            new Date(2004, 1, 1)
        ));
    }

    @Override
    public List<User> findAllUsers() {
        return users;
    }

    @Override
    public void saveUser(User user) {
        users.add(user);
    }

    @Override
    public User findUserById(UUID userId) {
        return users.stream()
            .filter(user -> user.getId().equals(userId))
            .findFirst()
            .orElse(null);
    }

    @Override
    public User findUserByUsername(String username) {
        return users.stream()
            .filter(user -> user.getUsername().equals(username))
            .findFirst()
            .orElse(null);
    }

    @Override
    public void updateUser(UUID userId, User user) {
        User existingUser = findUserById(userId);
        if (existingUser != null) {
            users.remove(existingUser);
            users.add(user);
        }
    }

    @Override
    public void deleteUser(UUID userId) {
        User user = findUserById(userId);
        if (user != null) {
            users.remove(user);
        }
    }
}
