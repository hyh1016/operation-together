package com.yhproject.operation_together.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OperationResponseDto {

    private Long id;
    private String name;
    private String link;
    private String operationKoDate;
    private int type;

    @Builder
    public OperationResponseDto(Long id, String name, String link, String operationKoDate, int type) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.operationKoDate = operationKoDate;
        this.type = type;
    }

}
