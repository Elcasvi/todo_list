package com.virtualtek.todo_list_backend.controller;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.repositories.Category_repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoriesController {
    private final Category_repository category_repository;

    public CategoriesController(Category_repository category_repository) {
        this.category_repository = category_repository;
    }

    @PostMapping("api/newCategory")
    Category newCategory(@RequestBody Category category)
    {
        return category_repository.save(category);
    }
}
