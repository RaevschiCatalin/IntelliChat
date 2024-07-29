package io.ctif.proiect.config;


import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;


@Getter
@Setter
@Component
public class WebClientConfig {
    @Value("${ollama.url}")
    private String url;

}
