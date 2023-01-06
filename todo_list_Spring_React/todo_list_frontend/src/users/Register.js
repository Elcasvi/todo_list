import React from 'react'
import axios from 'axios';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect, useState } from 'react';
export default function Register() {
  const[saveUserVar,setSaveUserVar]=useState(false);

    const [user,setUser]=useState(
    {
      username:"",
      password:""
    }
  );
  
  const{username,password}=user    
  const[errorMessage,setErrorMessage]=useState(null)

   useEffect(()=>{
     console.log("dentro del useEffect");
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
    console.log("I am sending a request to regist");
    saveUser()
  }
  
  const saveUser=()=>
  {
    axios.post("http://localhost:8080/api/register",user)
    .then((response)=>
    {
      console.log("Todo bien!!!!!!!")
      console.log(response.data)
      setErrorMessage("")
      setUser(response.data)
      setSaveUserVar(true)
      window.location.href="/dashboard/General"
    })
    .catch((error)=>
    {
      console.log("Error!!!!!!!!!!!!!!!")
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
    console.log("Dentro de createNewCategory:")
    await axios.post("http://localhost:8080/api/newCategory",category)
    .then((response)=>
    {
      console.log("Todo bien!!!!!!!")
      console.log(response.data)
      setErrorMessage("")
      setUser(response.data)
    })
    .catch((error)=>
    {
      console.log("Error!!!!!!!!!!!!!!!")
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }
  
  /*
  if(errorMessage=="")
  {
    createNewCategory();
  }
*/

  

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
