package com.virtualtek.todo_list_backend.services;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.repositories.Category_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    private Category_repository category_repository;

    public Category newCategory(Category category)
    {
        return category_repository.save(category);
    }

}
