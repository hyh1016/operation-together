package com.yhproject.operation_together.common.controller;

import com.yhproject.operation_together.input.dto.InputResponse;
import com.yhproject.operation_together.input.dto.ResultResponse;
import com.yhproject.operation_together.input.service.InputService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final InputService inputService;

    @GetMapping("/operations/{link}/inputs")
    public ResponseEntity<InputResponse> getInputs(@RequestParam Long operationId, @PathVariable String link) {
        return ResponseEntity.ok(inputService.getInputs(operationId, link));
    }

    @GetMapping("/operations/{link}/result")
    public ResponseEntity<ResultResponse> getResponse(@RequestParam Long operationId, @PathVariable String link) {
        return ResponseEntity.ok(inputService.getResponse(operationId, link));
    }

}
