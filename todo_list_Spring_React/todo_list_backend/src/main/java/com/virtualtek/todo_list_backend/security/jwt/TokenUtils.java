package com.virtualtek.todo_list_backend.security.jwt;
/*
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.TextCodec;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenUtils {

    private final static String ACCESS_TOKEN_SECRET="Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E";
    private final static Long ACCESS_TOKEN_VALIDITY_SECONDS=2_592_000L;


    public static String createToken(String nombre,String email) throws UnsupportedEncodingException {
        long expirationtype=ACCESS_TOKEN_VALIDITY_SECONDS*1_000;
        Date expirationDate=new Date(System.currentTimeMillis()+expirationtype);

        Map<String,Object>extra=new HashMap<>();
        extra.put("nombre",nombre);

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .addClaims(extra)
                .signWith(SignatureAlgorithm.HS256,"Yn2kjibddFAWtnPJ2AFlL8WXmohJMCvigQggaEypa5E=".getBytes("UTF-8"))
                .compact();
    }

    public static UsernamePasswordAuthenticationToken getAuthentication(String token)
    {
        try
        {
            Claims claims=Jwts.parser().setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
                    .parseClaimsJws(token)
                    .getBody();
            String email=claims.getSubject();
            return new UsernamePasswordAuthenticationToken(email,null, Collections.emptyList());
        }
        catch (JwtException exception)
        {
            return null;
        }
    }
}
*/