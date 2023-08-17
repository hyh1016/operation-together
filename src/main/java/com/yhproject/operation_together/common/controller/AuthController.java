package com.yhproject.operation_together.common.controller;

import com.yhproject.operation_together.input.dto.InputResponseDto;
import com.yhproject.operation_together.input.dto.ResultDto;
import com.yhproject.operation_together.input.service.InputService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final InputService inputService;

    @GetMapping("/operations/{link}/inputs")
    public ResponseEntity<InputResponseDto> getInputs(@RequestAttribute("operationId") Long operationId, @PathVariable String link) {
        return ResponseEntity.status(HttpStatus.OK).body(inputService.getInputs(operationId, link));
    }

    @GetMapping("/operations/{link}/result")
    public ResponseEntity<ResultDto> getResponse(@RequestAttribute("operationId") Long operationId, @PathVariable String link) {
        return ResponseEntity.status(HttpStatus.OK).body(inputService.getResponse(operationId, link));
    }

}
