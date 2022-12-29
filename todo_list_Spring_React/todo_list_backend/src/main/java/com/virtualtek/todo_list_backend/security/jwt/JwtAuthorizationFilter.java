package com.virtualtek.todo_list_backend.security.jwt;
/*
import com.virtualtek.todo_list_backend.model.repositories.User_repository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.net.http.HttpHeaders;
import java.util.List;

import static org.apache.logging.log4j.ThreadContext.isEmpty;


public class JwtAuthorizationFilter extends OncePerRequestFilter{
    @Autowired
    private User_repository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        final String header=request.getHeader("Authorization");
        if(!StringUtils.hasText(header)||(StringUtils.hasText(header)&&!header.startsWith("Bearer")))
        {
            chain.doFilter(request,response);
            return;
        }

        //Authorization -> Bearer sjkhdkasjhKJHKJH2327
        final String token=header.split("")[1].trim();

        //gET USER identity and set it on the spring security context
        UserDetails userDetails=userRepository.findByEmail(jwtUtil.getUsernameFromToken(token))
                .orElse(null);


        //Get jwt token and validate
        if(!jwtUtil.validateToken(token,userDetails))
        {
            chain.doFilter(request,response);
            return;
        }


        UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
                userDetails,null,
                userDetails==null?
                        List.of():userDetails.getAuthorities()
        );

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        chain.doFilter(request,response);



        /*
        if(header!=null && header.startsWith("Bearer"))
        {
            String token=header.replace("Bearer","");
            UsernamePasswordAuthenticationToken usernamePAT= TokenUtils.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(usernamePAT);
        }
        chain.doFilter(request,response);


    }
}
*/