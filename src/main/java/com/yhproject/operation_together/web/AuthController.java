package com.yhproject.operation_together.web;

import com.yhproject.operation_together.service.InputService;
import com.yhproject.operation_together.web.dto.InputResponseDto;
import com.yhproject.operation_together.web.dto.ResultDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final InputService inputService;

    @GetMapping("/operations/{link}/inputs")
    public InputResponseDto getInputs(@RequestAttribute("operationId") Long operationId, @PathVariable String link) {
        return inputService.getInputs(operationId, link);
    }

    @GetMapping("/operations/{link}/result")
    public ResultDto getResponse(@RequestAttribute("operationId") Long operationId, @PathVariable String link) {
        return inputService.getResponse(operationId, link);
    }

}
