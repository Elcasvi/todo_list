package com.virtualtek.todo_list_backend.model.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "users")
//Spring security
//public class User implements UserDetails {
public class User{
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String pasword;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();

    public User()
    {

    }

    public User(String name, String email, String pasword, List<Task> tasks) {
        this.name = name;
        this.email = email;
        this.pasword = pasword;
        this.tasks = tasks;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasword(String pasword) {
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

    /*
    Spring security

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority>roles=new ArrayList<>();
        roles.add(new Authority("ROLE_USER"));
        return roles;

        //return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return pasword;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
     */
}