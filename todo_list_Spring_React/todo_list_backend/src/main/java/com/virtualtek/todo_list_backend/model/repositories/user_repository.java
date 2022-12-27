package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface user_repository extends JpaRepository<User,Long> {
}
