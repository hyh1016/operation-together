package com.yhproject.operation_together.common.exception;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
public class ErrorResponse {

    private final HttpStatus status;
    private final String message;

}
