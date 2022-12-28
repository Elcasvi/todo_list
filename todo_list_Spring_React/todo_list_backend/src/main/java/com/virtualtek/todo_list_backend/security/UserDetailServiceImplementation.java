package com.virtualtek.todo_list_backend.security;

import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.User_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImplementation implements UserDetailsService
{
    @Autowired
    private User_repository userRepository;

    private PasswordEncoder passwordEncoder;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user=userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("El usuario con email: "+email+" ,no existe."));
        return user;
    }
}
