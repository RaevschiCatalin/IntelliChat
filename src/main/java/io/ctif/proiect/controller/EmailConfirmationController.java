package io.ctif.proiect.controller;

import io.ctif.proiect.model.User;
import io.ctif.proiect.service.EmailVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/api/auth")
public class EmailConfirmationController {
    @Autowired
    EmailVerificationService emailVerificationService;
    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam("token") String token, Model model) {
        boolean verified = emailVerificationService.verifyEmail(token);
        if (verified) {
            model.addAttribute("message", "Email verified successfully. Your account is now activated.");
            return "verification-success";
        } else {
            model.addAttribute("message", "Invalid or expired token.");
            return "verification-error";
        }
    }

}
