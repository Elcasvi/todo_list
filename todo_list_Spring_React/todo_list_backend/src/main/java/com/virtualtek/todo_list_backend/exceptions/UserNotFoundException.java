package com.virtualtek.todo_list_backend.exceptions;

public class userNotFoundException extends RuntimeException
{
    public userNotFoundException()
    {
        super("Could not found the user with the given credentials");
    }
}
