package com.example.jwt_demo.user;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable=false)
    private String username;

    @Column(nullable=false)
    private String password; // BCrypt

    @Column(nullable=false)
    private String displayName;

    @Column(nullable=false)
    private String roles; // e.g., "ROLE_USER"

    public User() {}

    public User(String username, String password, String displayName, String roles) {
        this.username = username;
        this.password = password;
        this.displayName = displayName;
        this.roles = roles;
    }

    // getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getDisplayName() { return displayName; }
    public String getRoles() { return roles; }

    // setters
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public void setRoles(String roles) { this.roles = roles; }
}
