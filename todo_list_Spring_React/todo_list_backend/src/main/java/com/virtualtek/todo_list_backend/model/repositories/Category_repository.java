package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Category_repository extends JpaRepository<Category,Long> {
    List<Category>findAllByUser(User user);

}
