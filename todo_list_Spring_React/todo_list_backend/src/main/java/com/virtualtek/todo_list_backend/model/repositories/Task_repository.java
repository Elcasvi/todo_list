package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Task_repository extends JpaRepository<Task,Long> {
}
