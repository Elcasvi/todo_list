package com.virtualtek.todo_list_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000","https://todo-list-page-uqcpbccs7q-uc.a.run.app/","https://todolistpage.sanchezapps.net/")
                .allowedMethods("GET","POST","PUT","DELETE", "HEAD","OPTIONS");
    }
}
