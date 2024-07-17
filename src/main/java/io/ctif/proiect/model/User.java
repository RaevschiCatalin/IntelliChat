package io.ctif.proiect.model;

import jakarta.persistence.*;
import lombok.*;


@Setter
@Getter
@ToString
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String email;
    private String username;

}
