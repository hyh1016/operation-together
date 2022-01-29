package com.yhproject.operation_together.web;

import com.yhproject.operation_together.service.InputService;
import com.yhproject.operation_together.web.dto.EmptyJSON;
import com.yhproject.operation_together.web.dto.InputSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class InputController {

    private final InputService inputService;

    @PostMapping("/api/inputs/{link}")
    public EmptyJSON createInputAll(@PathVariable String link, @RequestBody InputSaveRequestDto dtos) {
        return inputService.createInput(link, dtos);
    }

}
