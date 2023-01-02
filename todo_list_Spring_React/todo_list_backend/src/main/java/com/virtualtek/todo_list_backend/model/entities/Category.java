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

    public Category()
    {
    }

    public Category(String category_type) {
        this.category_type = category_type;
    }

    public String getCategory_type() {
        return category_type;
    }

    public void setCategory_type(String category_type) {
        this.category_type = category_type;
    }

    @Override
    public String toString() {
        return "Category{" +
                "category_type='" + category_type + '\'' +
                '}';
    }
}