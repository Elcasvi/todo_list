package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface Task_repository extends JpaRepository<Task,Long> {
    //Set<Task>findByUser_id(User user);
}
