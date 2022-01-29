package com.yhproject.operation_together.web;

import com.yhproject.operation_together.service.InputService;
import com.yhproject.operation_together.web.dto.InputResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final InputService inputService;

    @GetMapping("/api/auth/operations/{link}/inputs")
    public InputResponseDto getInputs(@RequestAttribute("operationId") Long operationId, @PathVariable String link) {
        return inputService.getInputs(operationId, link);
    }

}
