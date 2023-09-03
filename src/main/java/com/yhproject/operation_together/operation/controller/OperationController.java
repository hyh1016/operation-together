package com.yhproject.operation_together.operation.controller;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.operation.dto.CheckPasswordRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationRequest;
import com.yhproject.operation_together.operation.dto.CreateOperationResponse;
import com.yhproject.operation_together.operation.dto.OperationDto;
import com.yhproject.operation_together.operation.service.OperationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/operations")
@RestController
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CreateOperationResponse> createOperation(@RequestBody @Valid CreateOperationRequest requestDto) {
        log.info("작전 생성 요청 {}", requestDto);
        CreateOperationResponse responseDto = operationService.createOperation(requestDto);
        log.info("작전 생성 완료 {}", responseDto);
        return ResponseEntity.ok(responseDto);
    }

    @GetMapping(value = "/{link}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OperationDto> getOperation(@PathVariable String link) {
        return ResponseEntity.ok(operationService.getOperation(link));
    }

    @PostMapping(value = "/{link}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmptyJSON> checkPassword(@PathVariable String link, @RequestBody CheckPasswordRequest dto) throws Exception {
        return ResponseEntity.ok(operationService.checkPassword(link, dto));
    }

}
