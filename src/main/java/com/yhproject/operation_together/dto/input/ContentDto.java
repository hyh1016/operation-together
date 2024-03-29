package com.yhproject.operation_together.dto.input;

import com.yhproject.operation_together.entity.Content;
import lombok.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ContentDto {

    private Long id;
    private String content;

    public static ContentDto toDto(Content entity) {
        return ContentDtoMapper.INSTANCE.toDto(entity);
    }

    public Content toEntity() {
        return ContentDtoMapper.INSTANCE.toEntity(this);
    }

    @Mapper
    public interface ContentDtoMapper {
        ContentDtoMapper INSTANCE = Mappers.getMapper(ContentDtoMapper.class);

        ContentDto toDto(Content entity);

        Content toEntity(ContentDto dto);
    }

}
