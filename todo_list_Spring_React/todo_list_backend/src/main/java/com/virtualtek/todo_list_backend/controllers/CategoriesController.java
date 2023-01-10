package com.virtualtek.todo_list_backend.controllers;

import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.services.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoriesController {
    private final CategoryService categoryService;

    public CategoriesController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @PostMapping("api/newCategory")
    Category newCategory(@RequestBody Category category)
    {
        return categoryService.newCategory(category);
    }

    @PostMapping("api/deleteCategory")
    public String deleteCategory(@RequestBody Category category)
    {
        return categoryService.deleteCategory(category);
    }

    @PostMapping("api/findCategoryByCategoryAndUser/{categoryGiven}")
    public Category findCategoryByCategoryAndUser(@RequestBody User user, @PathVariable String categoryGiven)
    {
        return categoryService.findCategoryByCategoryAndUser(categoryGiven,user);
    }
    @PostMapping("api/findCategoryByCategoryIdAndUser/{id}")
    public Category findCategoryByCategoryIdAndUser(@RequestBody User user, @PathVariable Long id)
    {
        return categoryService.findCategoryByCategoryIdAndUser(id,user);
    }

    @PostMapping("api/getAllCategoriesByUser")
    public List<Category>getAllCategoriesByUser(@RequestBody User user)
    {
        return categoryService.getAllCategoriesByUser(user);
    }

    @PutMapping("api/updateCategory")
    public Category updateCategory(@RequestBody Category category)
    {
        return categoryService.updateCategory(category);
    }
}
