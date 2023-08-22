package com.yhproject.operation_together.input.dto;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@ToString
public class ResultResponse {

    private List<ResultResponseForm> result;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class ResultResponseForm {

        private String name;
        private String content;
    }

}
