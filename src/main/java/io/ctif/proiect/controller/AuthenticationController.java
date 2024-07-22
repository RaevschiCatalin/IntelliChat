package io.ctif.proiect.controller;

import io.ctif.proiect.model.User;
import io.ctif.proiect.service.AuthenticationService;
import io.ctif.proiect.service.EmailVerificationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        log.info("Login attempt for user with email {} and password {}", email, password);
        try {
            String token = authenticationService.authenticateUser(email, password);
            if (token != null) {
                log.info("Token {}", token);
                return ResponseEntity.ok(Map.of("access_token", token));
            } else {
                log.info("Invalid credentials");
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (IllegalStateException e) {
            log.info("Unverified email for user with email {}", email);
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }


//    @PostMapping("/delete")
//    public ResponseEntity<?> deleteAllUsers() {
//        authenticationService.deleteAllUsers();
//        log.info("All users deleted successfully");
//        return ResponseEntity.ok().body("All users deleted successfully");
//    }

}



