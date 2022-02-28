package com.yhproject.operation_together.input;

import com.yhproject.operation_together.common.dto.EmptyJSON;
import com.yhproject.operation_together.input.dto.InputSaveRequestDto;
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
    public ResponseEntity<EmptyJSON> createInput(@PathVariable String link, @RequestBody InputSaveRequestDto dtos) {
        return ResponseEntity.status(HttpStatus.OK).body(inputService.createInput(link, dtos));
    }

}
