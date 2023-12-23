package com.yhproject.operation_together.controller;

import com.yhproject.operation_together.common.config.CheckAuth;
import com.yhproject.operation_together.dto.InputListResponse;
import com.yhproject.operation_together.dto.input.CreateInputRequest;
import com.yhproject.operation_together.dto.input.InputDto;
import com.yhproject.operation_together.dto.input.ResultResponse;
import com.yhproject.operation_together.service.InputService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
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
    public ResponseEntity<InputDto> createInput(@PathVariable String link, @RequestBody @Valid CreateInputRequest dto) {
        log.info("{} 작전에 새 입력 추가 {}", link, dto);
        return ResponseEntity.ok(inputService.createInput(link, dto));
    }

    @CheckAuth
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<InputListResponse> getInputs(@PathVariable String link,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @RequestParam(defaultValue = "10") @Max(100) int size) {
        return ResponseEntity.ok(inputService.getInputList(link, page, size));
    }

    @CheckAuth
    @GetMapping(value = "/result", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ResultResponse>> getResult(@PathVariable String link) {
        return ResponseEntity.ok(inputService.getResultList(link));
    }

}
