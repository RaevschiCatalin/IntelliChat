package io.ctif.proiect.repository;

import io.ctif.proiect.model.PasswordResetToken;
import io.ctif.proiect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);

    void deleteByUser(User user);
    PasswordResetToken findByUser(User user);

}
