package com.yhproject.operation_together.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class InputResponseForm {

    private Long id;
    private String name;
    private List<String> contents;

    @Builder
    public InputResponseForm(Long id, String name, List<String> contents) {
        this.id = id;
        this.name = name;
        this.contents = contents;
    }

}
