package com.yhproject.operation_together.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/create")
    public String create() { return "create"; }

    @GetMapping("/operations/{link}")
    public String operation() { return "operation"; }

}
