package com.virtualtek.todo_list_backend.model.repositories;

import com.virtualtek.todo_list_backend.model.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Category_repository extends JpaRepository<Category,String> {
}
