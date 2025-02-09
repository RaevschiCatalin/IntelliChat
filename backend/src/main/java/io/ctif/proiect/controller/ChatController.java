package io.ctif.proiect.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ctif.proiect.config.WebClientConfig;
import io.ctif.proiect.model.GenerateRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Slf4j
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final WebClient webClient;

    public ChatController(WebClient.Builder webClientBuilder, WebClientConfig webClientConfig) {
        this.webClient = webClientBuilder.baseUrl(webClientConfig.getUrl()).build();
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> generate(
            @RequestParam("model") String model,
            @RequestParam("prompt") String prompt,
            @RequestParam("temperature") double temperature
    ) {
        return Flux.create(emitter -> {
            try {
                GenerateRequest request = new GenerateRequest(model, prompt, temperature);
                String jsonInputString = new ObjectMapper().writeValueAsString(request);

                webClient.post()
                        .uri("/api/generate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(jsonInputString)
                        .retrieve()
                        .bodyToFlux(String.class)
                        .doOnNext(emitter::next)
                        .doOnComplete(emitter::complete)
                        .doOnError(emitter::error)
                        .subscribe();
            } catch (Exception e) {
                emitter.error(e);
            }
        });
    }
}
