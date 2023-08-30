package com.yhproject.operation_together.input.controller;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.CreateInputRequest;
import com.yhproject.operation_together.input.service.InputService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/inputs")
@RestController
@RequiredArgsConstructor
public class InputController {

    private final InputService inputService;

    @PostMapping("/{link}")
    public ResponseEntity<EmptyJSON> createInput(@PathVariable String link, @RequestBody @Valid CreateInputRequest dto) {
        log.info("{} 작전에 새 입력 추가 {}", link, dto);
        return ResponseEntity.ok(inputService.createInput(link, dto));
    }

}
