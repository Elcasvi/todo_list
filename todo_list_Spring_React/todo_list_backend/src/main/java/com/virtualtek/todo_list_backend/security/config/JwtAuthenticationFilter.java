package com.virtualtek.todo_list_backend.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualtek.todo_list_backend.model.entities.User;
import com.virtualtek.todo_list_backend.security.AuthCredentials;
import com.virtualtek.todo_list_backend.security.TokenUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;



public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    //Los nuevos
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,HttpServletResponse response)throws AuthenticationException
    {
        AuthCredentials authCredentials=new AuthCredentials();
        try
        {
            authCredentials=new ObjectMapper().readValue(request.getReader(),AuthCredentials.class);
        }
        catch (IOException e)
        {

        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(
                authCredentials.getEmail(),
                authCredentials.getPassword(),
                Collections.emptyList()
        );

        return getAuthenticationManager().authenticate(usernamePasswordAuthenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        User user=(User)authResult.getPrincipal();
        String token= TokenUtils.createToken(user.getName(),user.getUsername());
        response.addHeader("Authorization","Bearer"+token);
        response.getWriter().flush();

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
