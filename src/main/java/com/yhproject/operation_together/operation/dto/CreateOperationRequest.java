package com.yhproject.operation_together.operation.dto;

import com.yhproject.operation_together.operation.entity.Operation;
import lombok.*;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateOperationRequest {

    private String name;
    private String password;
    private String link;
    private LocalDate operationDate;
    private int type;

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
