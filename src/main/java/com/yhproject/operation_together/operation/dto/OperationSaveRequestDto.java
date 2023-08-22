package com.yhproject.operation_together.operation.dto;

import com.yhproject.operation_together.operation.entity.Operation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@ToString
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

    public void setLink(String link) {
        this.link = link;
    }

    // DTO -> Entity
    public Operation toEntity() {
        return Operation.builder()
                .name(name)
                .password(password)
                .link(link)
                .operationDate(operationDate)
                .build();
    }

}
