package com.virtualtek.todo_list_backend.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private long name;

    @Column(name = "email")
    private long email;

    @Column(name = "password")
    private long pasword;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    public User()
    {

    }

    public User(long name, long email, long pasword, List<Task> tasks) {
        this.name = name;
        this.email = email;
        this.pasword = pasword;
        this.tasks = tasks;
    }

    public Long getId() {
        return id;
    }

    public long getName() {
        return name;
    }

    public void setName(long name) {
        this.name = name;
    }

    public long getEmail() {
        return email;
    }

    public void setEmail(long email) {
        this.email = email;
    }

    public long getPasword() {
        return pasword;
    }

    public void setPasword(long pasword) {
        this.pasword = pasword;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name=" + name +
                ", email=" + email +
                ", pasword=" + pasword +
                ", tasks=" + tasks +
                '}';
    }
}