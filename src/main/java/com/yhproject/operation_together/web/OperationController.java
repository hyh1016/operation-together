package com.yhproject.operation_together.web;

import com.yhproject.operation_together.service.OperationService;
import com.yhproject.operation_together.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;

    @PostMapping("/api/operations")
    public OperationSaveResponseDto createOperation(@RequestBody OperationSaveRequestDto dto) {
        return operationService.createOperation(dto);
    }

    @GetMapping("/api/operations/{link}")
    public OperationResponseDto getOperation(@PathVariable String link) {
        return operationService.getOperation(link);
    }

    @PostMapping("/api/operations/{link}")
    public PasswordResponseDto checkPassword(@PathVariable String link, @RequestBody PasswordRequestDto dto) {
        return operationService.checkPassword(link, dto);
    }

}
