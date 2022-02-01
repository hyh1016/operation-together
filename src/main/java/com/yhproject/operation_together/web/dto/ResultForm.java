package com.yhproject.operation_together.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResultForm {

    private String name;
    private String content;

    @Builder
    public ResultForm(String name, String content) {
        this.name = name;
        this.content = content;
    }
}
