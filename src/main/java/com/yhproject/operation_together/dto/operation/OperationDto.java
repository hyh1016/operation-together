package com.yhproject.operation_together.dto.operation;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.yhproject.operation_together.entity.Operation;
import lombok.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OperationDto {

    private Long id;
    private String name;
    private String link;
    @JsonFormat(pattern = "yyyy년 MM월 dd일")
    private LocalDate operationDate;

    public static OperationDto toDto(Operation entity) {
        return OperationDtoMapper.INSTANCE.toDto(entity);
    }

    public Operation toEntity() {
        return OperationDtoMapper.INSTANCE.toEntity(this);
    }

    @Mapper
    public interface OperationDtoMapper {
        OperationDtoMapper INSTANCE = Mappers.getMapper(OperationDtoMapper.class);

        OperationDto toDto(Operation entity);

        Operation toEntity(OperationDto dto);
    }

}
