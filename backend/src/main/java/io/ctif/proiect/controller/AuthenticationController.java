package io.ctif.proiect.controller;

import io.ctif.proiect.model.User;
import io.ctif.proiect.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public Mono<ResponseEntity<Map<String, String>>> registerUser(@Valid @RequestBody User user) {
        return Mono.fromCallable(() -> authenticationService.registerUser(user))
                .map(token -> {
                    log.info("User {} registered successfully", user.getEmail());
                    return ResponseEntity.ok(Map.of("access_token", token));
                })
                .onErrorResume(e -> {
                    log.error("Error during registration", e);
                    return Mono.just(ResponseEntity.status(500).body(Map.of("error", "Registration failed")));
                });
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<Map<String, String>>> loginUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        log.info("Login attempt for user with email {} and password {}", email, password);

        return Mono.fromCallable(() -> authenticationService.authenticateUser(email, password))
                .map(token -> {
                    if (token != null) {
                        log.info("Token {}", token);
                        return ResponseEntity.ok(Map.of("access_token", token));
                    } else {
                        log.info("Invalid credentials");
                        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
                    }
                })
                .onErrorResume(e -> {
                    log.error("Error during login", e);
                    return Mono.just(ResponseEntity.status(500).body(Map.of("error", "Login failed")));
                });
    }

    @PostMapping("/forgot-password")
    public Mono<ResponseEntity<String>> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        return Mono.fromRunnable(() -> authenticationService.generateAndSendResetPasswordToken(email))
                .then(Mono.just(ResponseEntity.ok("Password reset email sent.")))
                .doOnError(e -> log.error("Error sending password reset email", e));
    }

    @PostMapping("/reset-password")
    public Mono<String> resetPassword(@RequestBody Map<String, String> body) {
        String token = body.get("token");
        String newPassword = body.get("new_password");

        return Mono.fromCallable(() -> authenticationService.resetPassword(token, newPassword))
                .map(isReset -> isReset ? "reset-success" : "reset-error")
                .doOnNext(result -> log.info(result.equals("reset-success") ?
                        "Password reset successful" : "Invalid or expired token."))
                .onErrorResume(e -> {
                    log.error("Error during password reset", e);
                    return Mono.just("reset-error");
                });
    }
}
