package com.yhproject.operation_together.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ResultDto {

    private final List<ResultForm> result;

}
