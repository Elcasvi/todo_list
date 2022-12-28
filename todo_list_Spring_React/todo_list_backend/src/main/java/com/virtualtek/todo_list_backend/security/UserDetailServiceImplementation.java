package com.virtualtek.todo_list_backend.security;

import com.virtualtek.todo_list_backend.model.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImplementation implements UserDetailsService {

    private PasswordEncoder passwordEncoder;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=new User();
        user.setName("Carlos");
        user.setPasword(passwordEncoder.encode("asd"));
        user.setEmail("carlos@gmail.com");
        return user;
    }
}
