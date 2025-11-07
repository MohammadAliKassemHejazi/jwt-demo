package com.example.jwt_demo.auth;

import com.example.jwt_demo.security.JwtService;
import com.example.jwt_demo.user.User;
import com.example.jwt_demo.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtService jwtService;
    @Autowired private UserRepository userRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        if (userRepo.findByUsername(req.username()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        User user = new User();
        user.setUsername(req.username());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setDisplayName(req.displayName());
        user.setRoles("ROLE_USER");
        userRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.username(), req.password())
        );
        var user = userRepo.findByUsername(req.username()).orElseThrow();
        String token = jwtService.generate(user.getUsername(), user.getDisplayName(), Map.of());
        return ResponseEntity.ok(new LoginResponse(token, user.getDisplayName()));
    }

    @GetMapping("/me")
    public MeResponse me(Authentication authentication) {
        var user = userRepo.findByUsername(authentication.getName()).orElseThrow();
        return new MeResponse(user.getUsername(), user.getDisplayName());
    }
}
