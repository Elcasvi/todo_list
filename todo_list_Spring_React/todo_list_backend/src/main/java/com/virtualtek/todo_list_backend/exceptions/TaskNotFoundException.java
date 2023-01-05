package com.virtualtek.todo_list_backend.exceptions;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException()
    {
        super("Could not found the task with the given id");
    }
}
