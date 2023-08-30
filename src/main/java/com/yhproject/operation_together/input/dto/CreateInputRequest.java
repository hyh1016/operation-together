package com.yhproject.operation_together.input.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateInputRequest {

    @NotBlank
    private String name;

    @Size(min = 3, max = 3)
    private List<String> contents;

}
