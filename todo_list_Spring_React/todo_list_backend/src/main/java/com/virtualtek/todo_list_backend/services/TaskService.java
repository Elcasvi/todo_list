package com.virtualtek.todo_list_backend.services;

import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.Task_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {
    @Autowired
    private Task_repository task_repository;

    public Task newTask(Task newTask)
    {
        return task_repository.save(newTask);
    }
    public Task updateTask(Task task)
    {
        return task;
    }

    public List<Task> getAllTasksByUser(User user)
    {
        return task_repository.findAllByUser(user);
    }

    public Optional<Task> getTaskById(Long id)
    {
        return task_repository.findById(id);
    }

}
