package com.yhproject.operation_together.input.controller;

import com.yhproject.operation_together.common.config.CheckAuth;
import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.CreateInputRequest;
import com.yhproject.operation_together.input.dto.InputDto;
import com.yhproject.operation_together.input.dto.ResultResponse;
import com.yhproject.operation_together.input.service.InputService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/api/operations/{link}/inputs")
@RestController
@RequiredArgsConstructor
public class InputController {

    private final InputService inputService;

    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<EmptyJSON> createInput(@PathVariable String link, @RequestBody @Valid CreateInputRequest dto) {
        log.info("{} 작전에 새 입력 추가 {}", link, dto);
        return ResponseEntity.ok(inputService.createInput(link, dto));
    }

    @CheckAuth
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<InputDto>> getInputs(@PathVariable String link) {
        return ResponseEntity.ok(inputService.getInputList(link));
    }

    @CheckAuth
    @GetMapping(value = "/result", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ResultResponse>> getResult(@PathVariable String link) {
        return ResponseEntity.ok(inputService.getResultList(link));
    }

}
