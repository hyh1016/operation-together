package com.yhproject.operation_together.web;

import com.yhproject.operation_together.service.InputService;
import com.yhproject.operation_together.web.dto.EmptyJSON;
import com.yhproject.operation_together.web.dto.InputSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/inputs")
@RestController
@RequiredArgsConstructor
public class InputController {

    private final InputService inputService;

    @PostMapping("/{link}")
    public EmptyJSON createInput(@PathVariable String link, @RequestBody InputSaveRequestDto dtos) {
        return inputService.createInput(link, dtos);
    }

}
