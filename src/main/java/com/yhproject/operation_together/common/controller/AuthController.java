package com.yhproject.operation_together.common.controller;

import com.yhproject.operation_together.input.dto.InputDto;
import com.yhproject.operation_together.input.dto.ResultResponse;
import com.yhproject.operation_together.input.service.InputService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final InputService inputService;

    @GetMapping("/operations/{link}/inputs")
    public ResponseEntity<List<InputDto>> getInputs(@RequestParam Long operationId, @PathVariable String link) {
        return ResponseEntity.ok(inputService.getInputList(operationId, link));
    }

    @GetMapping("/operations/{link}/result")
    public ResponseEntity<List<ResultResponse>> getResponse(@RequestParam Long operationId, @PathVariable String link) {
        return ResponseEntity.ok(inputService.getResultList(operationId, link));
    }

}
