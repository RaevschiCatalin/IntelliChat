package io.ctif.proiect.model;

import lombok.*;

import java.util.List;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@ToString
public class LlamaResponse {
    private String model;
    private String createdAt;
    private String response;
    private boolean done;
    private String doneReason;
    private List<Integer> context;
    private long totalDuration;
    private long loadDuration;
    private int promptEvalCount;
    private long promptEvalDuration;
    private int evalCount;
    private long evalDuration;
}
