import React from 'react'
import axios from 'axios';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect, useState } from 'react';
export default function Login() {
    const [user,setUser]=useLocalState(
    {
      id:0,
      username:"",
      password:""
    }
  );
  const{username,password}=user    
  const[errorMessage,setErrorMessage]=useState("")

  const onInputChange=(event)=>
  {
    setUser({...user,[event.target.name]:event.target.value});
  }

  const sendLoginRequest=()=>
  {
    console.log("I am sending a request to login");
    getUser()
  }
  
  const getUser=()=>
  {
    axios.post("http://localhost:8080/api/login",user)
    .then((response)=>
    {
      console.log("Todo bien!!!!!!!")
      console.log(response.data)
      console.log(response.data.id)
      setErrorMessage("")
      setUser(response.data)
      window.location.href="/dashboard"
    })
    .catch((error)=>
    {
      console.log("Error!!!!!!!!!!!!!!!")
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }


  return (
    <div>
        <div>
            <label htmlFor='username'>Username</label>
            <input type="text" name="username" value={username} onChange={(event)=>onInputChange(event)}></input>
        </div>

        <div>
            <label htmlFor='username'>Password</label>
            <input type="password" name="password" value={password} onChange={(event)=>onInputChange(event)}></input>
        </div>
        <div>
          <button type='submit' onClick={(event)=>sendLoginRequest(event)} to="/dashboard">Login</button>
        </div>
        <div>
          <h1>Status</h1>
          {errorMessage!==""&&<h2>{errorMessage}</h2>}
        </div>
    </div>
  )
}