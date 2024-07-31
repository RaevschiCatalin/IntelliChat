package io.ctif.proiect.controller;

import io.ctif.proiect.service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/api/auth")
public class EmailConfirmationController {

    @Autowired
    EmailVerificationService emailVerificationService;

    @GetMapping("/verify-email")
    public Mono<String> verifyEmail(@RequestParam("token") String token, Model model) {
        return Mono.fromCallable(() -> emailVerificationService.verifyEmail(token))
                .map(verified -> {
                    if (verified) {
                        model.addAttribute("message", "Email verified successfully. Your account is now activated.");
                        return "verification-success";  // Thymeleaf template name
                    } else {
                        model.addAttribute("message", "Invalid or expired token.");
                        return "verification-error";  // Thymeleaf template name
                    }
                })
                .onErrorResume(e -> {
                    model.addAttribute("message", "Internal server error: " + e.getMessage());
                    return Mono.just("verification-error");  // Default to error page in case of exception
                });
    }
}
