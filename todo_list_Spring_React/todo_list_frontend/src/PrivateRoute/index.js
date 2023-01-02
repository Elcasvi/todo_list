import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

export default function PrivateRoute({children}) {
    const [user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
    
  );
  console.log("Dentro de private route")
  console.log(user.id)
  console.log(user.username)
  console.log(user.password)
  return (user.id?children:<Navigate to="/login"/>)
}
