package com.yhproject.operation_together.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class InputSaveRequestDto {

    private String name;
    private List<String> contents;

    @Builder
    public InputSaveRequestDto(String name, List<String> contents) {
        this.name = name;
        this.contents = contents;
    }

}
