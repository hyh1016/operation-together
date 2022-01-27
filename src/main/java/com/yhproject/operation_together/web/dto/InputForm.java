package com.yhproject.operation_together.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InputForm {

    private String name;
    private int position;
    private String content;

}
