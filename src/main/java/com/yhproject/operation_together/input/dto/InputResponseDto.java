package com.yhproject.operation_together.input.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class InputResponseDto {

    private final List<InputResponseForm> inputs;

}
