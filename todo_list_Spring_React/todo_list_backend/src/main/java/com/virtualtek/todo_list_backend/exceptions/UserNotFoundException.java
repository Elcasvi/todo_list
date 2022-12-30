package com.virtualtek.todo_list_backend.exceptions;

public class UserNotFoundException extends RuntimeException
{
    public UserNotFoundException()
    {
        super("Could not found the user with the given credentials");
    }
}
