package com.virtualtek.todo_list_backend.security;


import lombok.Data;


@Data
public class AuthCredentials {
    private String email;
    private String password;
}
