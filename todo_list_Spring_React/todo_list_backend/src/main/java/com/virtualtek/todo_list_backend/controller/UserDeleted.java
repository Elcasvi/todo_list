package com.virtualtek.todo_list_backend.controller;

import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.User_repository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserDeleted {
    private final User_repository userRepository;

    public UserDeleted(User_repository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/deleteMe")
    public String deleteAccount(HttpServletRequest request, HttpServletResponse response)
    {
        Cookie[] cookies=request.getCookies();
        for(Cookie cookie:cookies)
        {
            //System.out.println("Cookie name: "+cookie.getName()+" cookie value: "+cookie.getValue());
            User user=new User();

            Optional<User> users=userRepository.findByUsernameAndPassword(cookie.getName(),cookie.getValue());
            User newuser=users.get();
            userRepository.deleteById(newuser.getId());
            break;
        }
        return "Account deleted";
    }

}
