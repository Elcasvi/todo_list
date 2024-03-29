package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.services.UserService;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("https://virtualtek-todolist.azurewebsites.net/")
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

    @PostMapping("api/delete")
    String delete(@RequestBody User user)
    {
        return userService.deleteUser(user);
    }
}
