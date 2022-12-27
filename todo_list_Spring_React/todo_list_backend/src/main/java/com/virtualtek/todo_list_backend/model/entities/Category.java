package com.virtualtek.todo_list_backend.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @Column(name="category_type")
    private String category_type;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> tasks=new ArrayList<>();

    public Category()
    {
    }

    public Category(String category_type, List<Task> tasks) {
        this.category_type = category_type;
        this.tasks = tasks;
    }

    public String getCategory_type() {
        return category_type;
    }

    public void setCategory_type(String category_type) {
        this.category_type = category_type;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "Category{" +
                "category_type='" + category_type + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}