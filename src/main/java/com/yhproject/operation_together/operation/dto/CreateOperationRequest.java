package com.yhproject.operation_together.operation.dto;

import com.yhproject.operation_together.operation.entity.Operation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CreateOperationRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String password;

    private String link;

    @NotNull
    private LocalDate operationDate;

    public void setLink(String link) {
        this.link = link;
    }

    public Operation toEntity() {
        return CreateOperationRequestMapper.INSTANCE.toEntity(this);
    }

    @Mapper
    public interface CreateOperationRequestMapper {
        CreateOperationRequestMapper INSTANCE = Mappers.getMapper(CreateOperationRequestMapper.class);

        Operation toEntity(CreateOperationRequest dto);
    }

}
