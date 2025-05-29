package com.hcmus.softdes.aivideocreator.domain.entity;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@SuperBuilder
public class User extends Entity {
    private String username;
    private String email;
    private String password;
    private Date dateOfBirth;

    public User(
        UUID id,
        String username,
        String email,
        String password,
        Date dateOfBirth,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
    ) {
        super(id, createdAt, updatedAt);
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public static User create(
        String username,
        String email,
        String password,
        Date dateOfBirth
    ) {
        return new User(
            UUID.randomUUID(),
            username,
            email,
            password,
            dateOfBirth,
            LocalDateTime.now(),
            LocalDateTime.now()
        );
    }

    public void update(
        String username,
        String email,
        String password,
        Date dateOfBirth
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        super.update();
    }

}
