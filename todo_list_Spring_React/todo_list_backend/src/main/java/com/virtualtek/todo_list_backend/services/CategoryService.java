package com.virtualtek.todo_list_backend.services;

import com.virtualtek.todo_list_backend.exceptions.CategoryNotFoundException;
import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.Category_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private Category_repository category_repository;

    public Category newCategory(Category category)
    {
        return category_repository.save(category);
    }

    public String deleteCategory(Category category)
    {
        if(category_repository.existsById(category.getId()))
        {
            String categoryName=category.getCategory();
            category_repository.deleteById(category.getId());
            return "The category "+categoryName+" has been deleted successfully";
        }
        else
        {
            throw new CategoryNotFoundException();
        }
    }
    public Category findCategoryByCategoryAndUser(String categoryGiven, User user)
    {
        List<Category>listOfAllCategories=category_repository.findAllByUser(user);

        for(int i=0;i< listOfAllCategories.size();i++) {
            Category currentCategory = listOfAllCategories.get(i);
            if (currentCategory.getCategory().equals(categoryGiven)) {
                return currentCategory;
            }
        }
        throw new CategoryNotFoundException();
    }

}
