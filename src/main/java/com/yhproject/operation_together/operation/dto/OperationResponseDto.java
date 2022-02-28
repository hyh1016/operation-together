package com.yhproject.operation_together.operation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class OperationResponseDto {

    private Long id;
    private String name;
    private String link;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate operationKoDate;
    private int type;

    @Builder
    public OperationResponseDto(Long id, String name, String link, LocalDate operationDate, int type) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.operationKoDate = operationDate;
        this.type = type;
    }

}
