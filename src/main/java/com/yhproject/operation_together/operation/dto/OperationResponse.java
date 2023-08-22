package com.yhproject.operation_together.operation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OperationResponse {

    private Long id;
    private String name;
    private String link;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate operationDate;
    private int type;

}
