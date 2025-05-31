package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.application.dto.request.UserDto;
import com.hcmus.softdes.aivideocreator.application.exception.userException.UserNotFoundException;
import com.hcmus.softdes.aivideocreator.domain.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserByUsername(String username) {
        var user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UserNotFoundException();
        }
        return user;
    }

    public User registerUser(UserDto user) {
        var existingUser = userRepository.findUserByUsername(user.getUsername());
        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        User newUser = User.create(
            user.getUsername(),
            user.getEmail(),
            user.getPassword(),
            user.getDateOfBirth()
        );
        userRepository.saveUser(newUser);
        return newUser;
    }
}
