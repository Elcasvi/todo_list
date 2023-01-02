package com.virtualtek.todo_list_backend.controller;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.Task_repository;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class TasksCreationController {
    private final Task_repository task_repository;

    public TasksCreationController(Task_repository task_repository) {
        this.task_repository = task_repository;
    }

    @PostMapping("api/newTask")
    Task newTask(@RequestBody Task newTask,@RequestBody User user,@RequestBody Category category)
    {
        newTask.setUser_id(user);
        newTask.setCategories_category_type(category);
        return task_repository.save(newTask);

    }
}
