package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.services.UserService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/register")
    User register(@RequestBody User newUser)
    {
        return userService.registerNewUser(newUser);

    }

    @PostMapping("/api/login")
    User login(@RequestBody User userLogin)
    {
        return userService.userLogin(userLogin);
    }
}
