package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface User_repository extends JpaRepository<User,Long> {
    Optional<User>findByEmail(String email);
}
