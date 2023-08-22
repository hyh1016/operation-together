package com.yhproject.operation_together.operation.controller;

import com.yhproject.operation_together.operation.dto.*;
import com.yhproject.operation_together.operation.service.OperationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/operations")
@RestController
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;

    @PostMapping
    public ResponseEntity<CreateOperationResponse> createOperation(@RequestBody CreateOperationRequest requestDto) {
        log.info("작전 생성 요청 {}", requestDto);
        CreateOperationResponse responseDto = operationService.createOperation(requestDto);
        log.info("작전 생성 완료 {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{link}")
    public ResponseEntity<OperationResponse> getOperation(@PathVariable String link) {
        return ResponseEntity.ok(operationService.getOperation(link));
    }

    @PostMapping("/{link}")
    public ResponseEntity<CheckPasswordResponse> checkPassword(@PathVariable String link, @RequestBody CheckPasswordRequest dto) {
        return ResponseEntity.ok(operationService.checkPassword(link, dto));
    }

}
