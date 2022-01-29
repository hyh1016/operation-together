package com.yhproject.operation_together.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InputResponseForm {

    private Long id;
    private String name;
    private List<String> contents;

}
