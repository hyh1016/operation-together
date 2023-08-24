package com.yhproject.operation_together.common.controller;

import com.yhproject.operation_together.operation.dto.OperationDto;
import com.yhproject.operation_together.operation.service.OperationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class IndexController {

    private final OperationService operationService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/create")
    public String create() {
        return "create";
    }

    @GetMapping("/operations/{link}")
    public String operation(Model model, @PathVariable String link) {
        OperationDto operation = operationService.getOperation(link);
        model.addAttribute("operation", operation);
        return "operation";
    }

    @GetMapping("/operations/{link}/input")
    public String input(Model model, @PathVariable String link) {
        OperationDto operation = operationService.getOperation(link);
        model.addAttribute("operation", operation);
        return "input";
    }

    @GetMapping("/operations/{link}/result")
    public String result(Model model, @PathVariable String link) {
        OperationDto operation = operationService.getOperation(link);
        model.addAttribute("operation", operation);
        return "result";
    }

}
