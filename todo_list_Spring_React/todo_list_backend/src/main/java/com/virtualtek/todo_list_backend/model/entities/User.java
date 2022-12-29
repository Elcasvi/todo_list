package com.virtualtek.todo_list_backend.model.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
//Spring security
//public class User implements UserDetails {
public class User{
    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany
    //@JoinColumn(name="users")
    List<Task> tasks=new ArrayList<>();
    public User()
    {

    }
    public Long getId() {
        return id;
    }
    public void setId(Long id)
    {
        this.id=id;
    }

    public void setUsername(String username){
        this.username = username;
    }
    public String getUsername()
    {
        return username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public String getPassword()
    {
        return password;
    }




    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username=" + username +
                ", password=" + password +
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