package com.virtualtek.todo_list_backend.model.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="date")
    private LocalDate date;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="users")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="categories")
    private Category category;

    public Task()
    {

    }
    public Task(String title, String description, LocalDate date)
    {
        this.title = title;
        this.description = description;
        this.date = date;
    }
    public Task(String title, String description, LocalDate date, User user, Category category) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.user = user;
        this.category = category;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", user=" + user +
                ", Categories_category_type=" + category +
                '}';
    }
}