package com.yhproject.operation_together.web.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InputSaveRequestDto {

    private String name;
    private List<String> contents;

}
