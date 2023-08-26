package com.yhproject.operation_together.common.controller;

import com.yhproject.operation_together.common.service.AuthService;
import com.yhproject.operation_together.operation.dto.OperationDto;
import com.yhproject.operation_together.operation.service.OperationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Controller
@RequiredArgsConstructor
public class IndexController {

    private final OperationService operationService;
    private final AuthService authService;

    @ExceptionHandler(Exception.class)
    public String handleException(Exception e) {
        log.error("페이지 조회 중 오류가 발생했습니다.", e);
        return "redirect:/";
    }

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
    public String result(Model model, @PathVariable String link) throws Exception {
        if (!authService.isAuthenticated(link)) {
            throw new Exception("인증되지 않은 사용자가 결과 페이지에 접근했습니다. link: " + link);
        }
        OperationDto operation = operationService.getOperation(link);
        model.addAttribute("operation", operation);
        return "result";
    }

}
