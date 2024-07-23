package io.ctif.proiect.service;

import io.ctif.proiect.model.EmailVerificationToken;
import io.ctif.proiect.model.User;
import io.ctif.proiect.repository.EmailVerificationTokenRepository;
import io.ctif.proiect.repository.Repository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDateTime;
import java.util.UUID;


@Service
public class EmailVerificationService {
    private static final Logger logger = LoggerFactory.getLogger(EmailVerificationService.class);
    @Autowired
    private EmailVerificationTokenRepository tokenRepository;

    @Autowired
    private Repository userRepository;

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public void generateAndSendVerificationToken(User user) {
        EmailVerificationToken existingToken = tokenRepository.findByToken(user.getEmail());
        if (existingToken != null) {
            tokenRepository.delete(existingToken);
        }
        String token = UUID.randomUUID().toString();
        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        tokenRepository.save(verificationToken);
        sendVerificationEmail(user, token);
    }

    private void sendVerificationEmail(User user, String token) {
        String subject = "Email Verification";
        String url = "http://localhost:8080/api/auth/verify-email?token=" + token;

        Context context = new Context();
        context.setVariable("verificationUrl", url);
        String body = templateEngine.process("email_verification", context);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(body, true); // Set the text to HTML

            mailSender.send(mimeMessage);
            logger.info("Verification email sent to {}", user.getEmail());
        } catch (MessagingException e) {
            logger.error("Failed to send verification email to {}", user.getEmail(), e);
        }
    }

    public boolean verifyEmail(String token) {
        EmailVerificationToken verificationToken = tokenRepository.findByToken(token);
        if (verificationToken != null && verificationToken.getExpiryDate().isAfter(LocalDateTime.now())) {
            User user = verificationToken.getUser();
            user.setEnabled(true);
            userRepository.save(user);
            tokenRepository.delete(verificationToken);
            return true;
        }
        return false;
    }


    public void sendResetPasswordEmail(User user, String token) {
        String subject = "Reset Password";
        String url = "http://localhost:3000/reset-password?token=" + token;

        Context context = new Context();
        context.setVariable("resetUrl", url);
        String body = templateEngine.process("reset_password_email", context);

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(user.getEmail());
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(mimeMessage);
            logger.info("Reset password email sent to {}", user.getEmail());
        } catch (MessagingException e) {
            logger.error("Failed to send reset password email to {}", user.getEmail(), e);
        }
    }
}
