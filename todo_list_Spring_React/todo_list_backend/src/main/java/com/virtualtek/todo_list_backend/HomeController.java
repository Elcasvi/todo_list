package com.virtualtek.todo_list_backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String Home()
    {
        return "Hello from home";
    }
}
