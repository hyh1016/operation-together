package com.yhproject.operation_together.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OperationSaveResponseDto {

    private String link;

    @Builder
    public OperationSaveResponseDto(String link) {
        this.link = link;
    }
}
