import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Dashboard() {
    var change=false;
    const [user,setUser]=useState(
    {
      id:"",
      username:"",
      password:""
    }
  );


  const getUser=()=>
  {
    const myUser={
      username:"dev",
      password:"Theshad0999"
  }
    axios.post("http://localhost:8080/api/login",myUser)
    .then((response)=>
    {
      console.log("Todo bien!!!!!!!")
      console.log(response.data)
      setUser(response.data)
      change=true
      setUserCookies()
    })
    .catch((error)=>
    {
      console.log("Error!!!!!!!!!!!!!!!")
      console.log(error.response.status);
    });

  }

  const setUserCookies=()=>
  {
    const cookies=new Cookies();
    cookies.set("id:",user.id,{path:'/'});
    cookies.set("username:",user.username,{path:'/'});
    cookies.set("password:",user.password,{path:'/'});
  }


  useState(()=>
  {
    getUser()
  },[])


  return (
    <div>
        <h1>Hello World!!</h1>
        {user.id}
        <br/>
        {user.username}
        <br/>
        {user.password}
    </div>
  )
}
