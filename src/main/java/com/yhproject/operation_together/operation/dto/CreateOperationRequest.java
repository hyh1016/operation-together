package com.yhproject.operation_together.operation.dto;

import com.yhproject.operation_together.operation.entity.Operation;
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

    private String name;
    private String password;
    private String link;
    private LocalDate operationDate;
    private int type;

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
