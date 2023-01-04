package com.virtualtek.todo_list_backend.exceptions;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException()
    {
        super("Could not found the given category");
    }
}
