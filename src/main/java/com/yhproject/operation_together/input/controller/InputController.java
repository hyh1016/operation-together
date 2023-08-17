package com.yhproject.operation_together.input.controller;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.InputSaveRequestDto;
import com.yhproject.operation_together.input.service.InputService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/inputs")
@RestController
@RequiredArgsConstructor
public class InputController {

    private final InputService inputService;

    @PostMapping("/{link}")
    public ResponseEntity<EmptyJSON> createInput(@PathVariable String link, @RequestBody InputSaveRequestDto dto) {
        return ResponseEntity.status(HttpStatus.OK).body(inputService.createInput(link, dto));
    }

}
