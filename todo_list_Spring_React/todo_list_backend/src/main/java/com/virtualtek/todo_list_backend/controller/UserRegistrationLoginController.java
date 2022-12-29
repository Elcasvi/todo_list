package com.virtualtek.todo_list_backend.controller;

import com.virtualtek.todo_list_backend.exceptions.userNotFoundException;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.User_repository;
import jakarta.servlet.http.Cookie;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000")
public class UserRegistrationLoginController {
    private final User_repository userRepository;

    public UserRegistrationLoginController(User_repository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/register")
    User newUser(@RequestBody User newUser)
    {
        return userRepository.save(newUser);
    }

    @PostMapping("/api/login")
    User userLogin(@RequestBody User userLogin)
    {
        String username=userLogin.getUsername();
        String password=userLogin.getPassword();
        return userRepository.findByUsernameAndPassword(username,password).orElseThrow(()->new userNotFoundException());
    }
}
