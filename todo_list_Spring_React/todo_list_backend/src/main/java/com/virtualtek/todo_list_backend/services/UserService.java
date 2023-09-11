package com.virtualtek.todo_list_backend.services;


import com.virtualtek.todo_list_backend.exceptions.UserNotFoundException;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.model.repositories.User_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
//@Autowired
    private final User_repository userRepository;

    public UserService(User_repository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerNewUser(User newUser)
    {
        return userRepository.save(newUser);
    }

    public User userLogin(User user)
    {
        String username=user.getUsername();
        String password=user.getPassword();
        return userRepository.findByUsernameAndPassword(username,password).orElseThrow(()->new UserNotFoundException());
    }

    public String deleteUser(User user)
    {
        if(userRepository.existsById(user.getId()))
        {
            userRepository.deleteById(user.getId());
            return "The user has benn deleted succesfully";
        }
        else
        {
            throw new UserNotFoundException();
        }
    }
}
