package com.virtualtek.todo_list_backend.services;

import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.repositories.Task_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private Task_repository task_repository;

    public Task newTask(Task newTask)
    {
        return task_repository.save(newTask);
    }
}
