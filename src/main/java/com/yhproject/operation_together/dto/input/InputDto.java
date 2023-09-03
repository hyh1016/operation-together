package com.yhproject.operation_together.dto.input;

import com.yhproject.operation_together.entity.Input;
import lombok.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class InputDto {

    private Long id;
    private String name;
    private List<ContentDto> contents;

    public static InputDto toDto(Input entity) {
        return InputDtoMapper.INSTANCE.toDto(entity);
    }

    public Input toEntity() {
        return InputDtoMapper.INSTANCE.toEntity(this);
    }

    @Mapper
    public interface InputDtoMapper {
        InputDtoMapper INSTANCE = Mappers.getMapper(InputDtoMapper.class);

        InputDto toDto(Input entity);

        Input toEntity(InputDto dto);
    }

}
