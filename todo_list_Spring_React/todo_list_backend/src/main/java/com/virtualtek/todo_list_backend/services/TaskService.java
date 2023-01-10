package com.virtualtek.todo_list_backend.services;

import com.virtualtek.todo_list_backend.exceptions.TaskNotFoundException;
import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.repositories.Task_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TaskService {
    @Autowired
    private Task_repository task_repository;
    @Autowired
    private CategoryService categoryService;

    public Task newTask(Task newTask)
    {
        LocalDate date = LocalDate.now();
        newTask.setDate(date);
        return task_repository.save(newTask);
    }
    public Task updateTask(Task task)
    {
        return task_repository.save(task);
    }

    public List<Task> getAllTasksByCategory(Category category)
    {
        return task_repository.findAllByCategory(category);
    }

    public Task getTaskById(Long id)
    {
        return task_repository.findById(id).orElseThrow(()->new TaskNotFoundException());
    }
    public String deleteTask(Task task)
    {
        System.out.println(task);
        if(task_repository.existsById(task.getId()))
        {
            task_repository.deleteById(task.getId());
            return("Task deleted succesfully");
        }
        else
        {
            throw new TaskNotFoundException();
        }
    }
}
