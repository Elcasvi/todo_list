package com.virtualtek.todo_list_backend.model.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="date")
    private LocalDate date;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="users")
    private User user_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="categories")
    private Category categories_category_type;

    public Task()
    {

    }

    public Task(String title, String description, LocalDate date, User user_id, Category categories_category_type) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.user_id = user_id;
        this.categories_category_type = categories_category_type;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public Category getCategories_category_type() {
        return this.categories_category_type;
    }

    public void setCategories_category_type(Category categories_category_type) {
        this.categories_category_type = categories_category_type;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", user_id=" + user_id +
                ", Categories_category_type=" + categories_category_type +
                '}';
    }
}