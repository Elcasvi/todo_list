package com.virtualtek.todo_list_backend.security.config;

/*
import com.virtualtek.todo_list_backend.security.jwt.JwtAuthenticationFilter;
import com.virtualtek.todo_list_backend.security.jwt.JwtAuthorizationFilter;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.OPTIONS;

@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig{

    @Autowired
    private final UserDetailsService userDetailsService;//Clase que me da Spring
    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    @Autowired
    CustomPasswordEncoder customPasswordEncoder;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,AuthenticationManager authenticationManager) throws Exception {

        JwtAuthenticationFilter jwtAuthenticationFilter=new JwtAuthenticationFilter();
        jwtAuthenticationFilter.setAuthenticationManager(authenticationManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/login");

        return http
                .csrf().disable()
                .authorizeHttpRequests((requests)->requests
                        .requestMatchers(OPTIONS).permitAll()
                        .requestMatchers("/api/auth/login").permitAll()
                        .anyRequest().authenticated())
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http)throws Exception
    {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(customPasswordEncoder.getPasswordEncoder())
                .and()
                .build();
    }
    public static void main(String[]args)
    {
        System.out.println("pass: "+new BCryptPasswordEncoder().encode("carlos"));
    }
}
*/