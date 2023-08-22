package com.yhproject.operation_together.input.dto;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class InputResponse {

    private List<InputResponseForm> inputs;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class InputResponseForm {

        private Long id;
        private String name;
        private List<String> contents;

    }

}
