package com.virtualtek.todo_list_backend.security.config;
/*
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.User_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImplementation implements UserDetailsService
{
    @Autowired
    private User_repository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User>user=userRepository.findByEmail(email);
        return user.orElseThrow(()-> new UsernameNotFoundException("El usuario con email: "+email+" ,no existe."));
    }
}
*/