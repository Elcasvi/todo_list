import React from 'react'
import axios from 'axios';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect, useState } from 'react';
export default function Register() {
  const[saveUserVar,setSaveUserVar]=useState(false);

    const [user,setUser]=useLocalState(
    {
      id:0,
      username:"",
      password:""
    }
  );
  
  const{username,password}=user    
  const[errorMessage,setErrorMessage]=useState(null)

  useEffect(()=>
  {
    setUser({...user,id:0,username:"",password:""})
  },[])
   useEffect(()=>{
    if(saveUserVar==true)
    {
      createNewCategory()
    }
  },[saveUserVar]);

  const onInputChange=(event)=>
  {
    setUser({...user,[event.target.name]:event.target.value});
  }

  const sendLoginRequest=()=>
  {
    saveUser()
  }
  
  const saveUser=()=>
  {
    axios.post("http://localhost:8080/api/register",user)
    .then((response)=>
    {
      console.log(response.data)
      setErrorMessage("")
      setUser(response.data)
      setSaveUserVar(true)
      window.location.href="/login"
    })
    .catch((error)=>
    {
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }


  const createNewCategory=async()=>
  {
    const category=
    {
      category:"General",
      user:user
    }
    
    await axios.post("http://localhost:8080/api/newCategory",category)
    .then((response)=>
    {
      console.log(response.data)
      setErrorMessage("")
      setUser(response.data)
    })
    .catch((error)=>
    {
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
          <button type='submit' onClick={(event)=>sendLoginRequest(event)} to="/dashboard">Register</button>
        </div>
        <div>
          <h1>Status</h1>
          {errorMessage!==""&&<h2>{errorMessage}</h2>}
        </div>
    </div>
  )
}
