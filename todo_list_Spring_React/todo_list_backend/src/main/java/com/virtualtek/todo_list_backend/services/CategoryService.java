package com.virtualtek.todo_list_backend.services;

import com.virtualtek.todo_list_backend.exceptions.CategoryNotFoundException;
import com.virtualtek.todo_list_backend.model.entities.Category;
import com.virtualtek.todo_list_backend.model.entities.Task;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.Category_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private Category_repository category_repository;
    @Autowired
    private TaskService taskService;

    @Autowired
    private AWSS3Service awss3Service;

    public Category newCategory(Category category)
    {
        return category_repository.save(category);
    }

    public Category updateCategory(Category category)
    {
        System.out.println("Dentro de updtCategory");
        System.out.println(category);
        return category_repository.findById(category.getId()).map(categoryIterator->{
            categoryIterator.setId(category.getId());
            categoryIterator.setCategory(category.getCategory());
            categoryIterator.setUser(category.getUser());
            return(category_repository.save(categoryIterator));
        }).orElseThrow(()->new CategoryNotFoundException());
    }


    public String deleteCategory(Category category)
    {
        if(category_repository.existsById(category.getId()))
        {
            List<Task>ListOfTasks=taskService.getAllTasksByCategory(category);
            for(Task task:ListOfTasks)
            {
                awss3Service.deleteObject(task.getFileKey());
                taskService.deleteTask(task);
            }
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

    public Category findCategoryByCategoryIdAndUser(Long id,User user)
    {
        return category_repository.findCategoryByIdAndUser(id,user);
    }
    public List<Category> getAllCategoriesByUser(User user)
    {
        return category_repository.findAllByUser(user);
    }

}
