import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Dashboard() {
    const [user,setUser]=useState(
    {
      id:"",
      username:"",
      password:""
    }
  );


  const setUserCookies=()=>
  {
    const cookies=new Cookies();
    cookies.set("id:",user.id,{path:'/'});
    cookies.set("username:",user.username,{path:'/'});
    cookies.set("password:",user.password,{path:'/'});
  }


  

  return (
    <div>
        <h1>Hello World!!</h1>
    </div>
  )
}
