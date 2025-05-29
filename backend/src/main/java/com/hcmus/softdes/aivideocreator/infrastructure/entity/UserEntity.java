package com.hcmus.softdes.aivideocreator.infrastructure.entity;

import com.hcmus.softdes.aivideocreator.domain.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "DOB")
    private Date DOB;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(name = "last_modified", nullable = false)
    private LocalDateTime lastModified;


    // Convert to domain model
    public User toDomain() {
        return new User(
                this.id,
                this.username,
                this.password,
                this.email,
                this.DOB,
                this.creationDate,
                this.lastModified
        );
    }
}
