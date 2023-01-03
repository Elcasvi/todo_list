package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.services.TaskService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class TasksController {

    private final TaskService taskService;

    public TasksController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("api/newTask")
    public Task task(@RequestBody Task newTask)
    {
        return taskService.newTask(newTask);
    }
}
