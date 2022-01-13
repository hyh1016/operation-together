package com.yhproject.operation_together.web.dto;

import com.yhproject.operation_together.domain.operation.Operation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class OperationSaveRequestDto {

    private String name;
    private String password;
    private String link;
    private LocalDate operationDate;
    private int type;

    @Builder
    public OperationSaveRequestDto(String name, String password, LocalDate operationDate, int type) {
        this.name = name;
        this.password = password;
        this.operationDate = operationDate;
        this.type = type;
    }

    // DTO -> Entity
    public Operation toEntity() {
        return Operation.builder()
                .name(name)
                .password(password)
                .link(link)
                .operationDate(operationDate)
                .type(type)
                .build();
    }

}
