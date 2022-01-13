package com.yhproject.operation_together.web;

import com.yhproject.operation_together.service.OperationService;
import com.yhproject.operation_together.web.dto.OperationSaveRequestDto;
import com.yhproject.operation_together.web.dto.OperationSaveResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OperationController {

    private final OperationService operationService;

    @PostMapping("/api/operations")
    public OperationSaveResponseDto createOperation(@RequestBody OperationSaveRequestDto dto) {
        return OperationSaveResponseDto.builder().link(operationService.createOperation(dto)).build();
    }

}
