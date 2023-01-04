package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin("http://localhost:3000")
public class TasksController {

    private final TaskService taskService;

    public TasksController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("api/newTask")
    public Task newTask(@RequestBody Task newTask)
    {
        return taskService.newTask(newTask);
    }

    @PutMapping("api/updateTask")
    public Task updateTask(@RequestBody Task task)
    {
        return taskService.updateTask(task);
    }

    @PostMapping("/api/getAllTasksByUser")
    public List<Task> getAllTasksByUser(@RequestBody User user)
    {
        return taskService.getAllTasksByUser(user);
    }
    @GetMapping("/api/getTaskById")
    public Optional<Task> getTaskById(@RequestBody Task task)
    {
        return taskService.getTaskById(task.getId());
    }


}
