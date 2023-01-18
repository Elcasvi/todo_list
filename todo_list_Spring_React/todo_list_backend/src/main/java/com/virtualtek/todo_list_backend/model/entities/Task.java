package com.virtualtek.todo_list_backend.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @Column(name="filepath")
    private String filePath;
    @Transient
    private String fileUrl;

    @ManyToOne(fetch= FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @JoinColumn(name="categories")
    private Category category;

    public Task()
    {

    }
    public Task(String title, String description, LocalDate date,Category category,String filePath,String fileUrl)
    {
        this.title = title;
        this.description = description;
        this.date = date;
        this.category = category;
        this.filePath=filePath;
        this.fileUrl=fileUrl;
    }
    public Task(String title, String description, LocalDate date)
    {
        this.title = title;
        this.description = description;
        this.date = date;
    }
    public Task(String title, String description, LocalDate date, Category category) {
        this.title = title;
        this.description = description;
        this.date = date;
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

    public Category getCategory() {
        return this.category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", filePath='" + filePath + '\'' +
                ", fileUrl='" + fileUrl + '\'' +
                ", category=" + category +
                '}';
    }
}