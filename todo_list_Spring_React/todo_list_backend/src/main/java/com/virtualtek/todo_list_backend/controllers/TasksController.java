package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.services.AWSS3Service;
import com.virtualtek.todo_list_backend.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("https://virtualtek-todolist.azurewebsites.net/")
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

    @PostMapping("/api/getAllTasksByCategory")
    public List<Task> getAllTasksByCategory(@RequestBody Category category)
    {
        return taskService.getAllTasksByCategory(category);
    }
    @GetMapping("/api/getTaskById/{id}")
    public Task getTaskById(@PathVariable Long id)
    {
        return taskService.getTaskById(id);
    }

    @PostMapping("api/deleteTask")
    public String deleteTask(@RequestBody Task task)
    {
        return taskService.deleteTask(task);
    }

}
