package io.ctif.proiect.controller;

import io.ctif.proiect.model.User;
import io.ctif.proiect.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        String token = authenticationService.registerUser(user);
        log.info("User {} registered successfully", user.getEmail());
        return ResponseEntity.ok(Map.of("access_token",token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String ,String> body) {
        String email = body.get("email");
        String password = body.get("password");
        log.info("Login attempt for user with email {} and password {} " , email,password);
        String token = authenticationService.authenticateUser(email, password);
        log.info("Token {}" , token);
        if (token != null) {
            return ResponseEntity.ok(Map.of("access_token",token));
        }
        log.info("invalid token");
        return ResponseEntity.status(401).body("Invalid credentials");
    }
    @PostMapping("/delete")
    public ResponseEntity<?> deleteAllUsers() {
        authenticationService.deleteAllUsers();
        log.info("All users deleted successfully");
        return ResponseEntity.ok().body("All users deleted successfully");
    }
}
