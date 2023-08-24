package com.yhproject.operation_together.input.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateInputRequest {

    private String name;
    private List<String> contents;

}
