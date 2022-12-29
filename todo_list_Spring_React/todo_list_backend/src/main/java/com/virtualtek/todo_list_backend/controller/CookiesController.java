package com.virtualtek.todo_list_backend.controller;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CookiesController {
    @GetMapping("/getCookies")
    public void getCookies(HttpServletRequest request, HttpServletResponse response)
    {
        Cookie[] cookies=request.getCookies();
        for(Cookie cookie:cookies)
        {
            //System.out.println("Cookie name: "+cookie.getName()+" cookie value: "+cookie.getValue());
            Cookie newCookie=new Cookie(cookie.getName(),cookie.getValue());
            newCookie.setPath("/"); // global cookie accessible everywhere
            response.addCookie(newCookie);
            break;
        }
    }
}
