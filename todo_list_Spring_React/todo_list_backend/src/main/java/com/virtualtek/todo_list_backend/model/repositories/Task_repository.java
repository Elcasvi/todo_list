package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface Task_repository extends JpaRepository<Task,Long> {
   List<Task>findAllByCategory(Category category);
}
