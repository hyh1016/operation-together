package com.yhproject.operation_together.operation;

import com.yhproject.operation_together.operation.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/operations")
@RestController
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;

    @PostMapping
    public ResponseEntity<OperationSaveResponseDto> createOperation(@RequestBody OperationSaveRequestDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(operationService.createOperation(dto));
    }

    @GetMapping("/{link}")
    public ResponseEntity<OperationResponseDto> getOperation(@PathVariable String link) {
        return ResponseEntity.status(HttpStatus.OK).body(operationService.getOperation(link));
    }

    @PostMapping("/{link}")
    public ResponseEntity<PasswordResponseDto> checkPassword(@PathVariable String link, @RequestBody PasswordRequestDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(operationService.checkPassword(link, dto));
    }

}
