package com.hcmus.softdes.aivideocreator.api.services;

import com.hcmus.softdes.aivideocreator.application.services.UserService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ApplicationUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public ApplicationUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userService.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .build();
    }
}

