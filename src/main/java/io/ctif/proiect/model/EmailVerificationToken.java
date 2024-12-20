package io.ctif.proiect.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class EmailVerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime expiryDate;


    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;
}
