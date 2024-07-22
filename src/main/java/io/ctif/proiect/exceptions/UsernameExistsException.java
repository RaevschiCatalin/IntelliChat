package io.ctif.proiect.exceptions;

public class UsernameExistsException extends RuntimeException {
    public UsernameExistsException(String message) {
        super(message);
    }
}
