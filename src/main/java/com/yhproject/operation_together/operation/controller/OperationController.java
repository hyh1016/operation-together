package com.yhproject.operation_together.operation.controller;

import com.yhproject.operation_together.common.config.CheckAuth;
import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.InputDto;
import com.yhproject.operation_together.input.dto.ResultResponse;
import com.yhproject.operation_together.input.service.InputService;
import com.yhproject.operation_together.operation.dto.CheckPasswordRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationResponse;
import com.yhproject.operation_together.operation.dto.OperationDto;
import com.yhproject.operation_together.operation.service.OperationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/api/operations")
@RestController
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;
    private final InputService inputService;

    @PostMapping
    public ResponseEntity<CreateOperationResponse> createOperation(@RequestBody CreateOperationRequest requestDto) {
        log.info("작전 생성 요청 {}", requestDto);
        CreateOperationResponse responseDto = operationService.createOperation(requestDto);
        log.info("작전 생성 완료 {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/{link}")
    public ResponseEntity<OperationDto> getOperation(@PathVariable String link) {
        return ResponseEntity.ok(operationService.getOperation(link));
    }

    @PostMapping("/{link}")
    public ResponseEntity<EmptyJSON> checkPassword(@PathVariable String link, @RequestBody CheckPasswordRequest dto) throws Exception {
        return ResponseEntity.ok(operationService.checkPassword(link, dto));
    }

    @CheckAuth
    @GetMapping("/{link}/inputs")
    public ResponseEntity<List<InputDto>> getInputs(@PathVariable String link) {
        return ResponseEntity.ok(inputService.getInputList(link));
    }

    @CheckAuth
    @GetMapping("/{link}/result")
    public ResponseEntity<List<ResultResponse>> getResponse(@PathVariable String link) {
        return ResponseEntity.ok(inputService.getResultList(link));
    }

}
