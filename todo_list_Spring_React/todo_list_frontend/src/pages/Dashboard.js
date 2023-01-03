import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useLocalState } from '../util/useLocalStorage';
import createTask from '../util/createTask';

export default function Dashboard() {


    const [user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );

  const[errorMessage,setErrorMessage]=useState("")

  const[category,setCategory]=useState(
    {
      category_type:"General"
    }
  );
  
  const[task,setTask]=useState(
    {
      title:"Nueva tarea react",
      description:"Tarea desde react",
      date:"2023-01-01",
      user_id:user,
      categories_category_type:category
    }
  );

  const createAssignment=async()=>
  {
    
    setTask({...task,user_id:user,categories_category_type:category})
    console.log("setTask:")
    console.log(task)
    console.log(task.user_id)
    console.log(task.categories_category_type)

    const tarea=await axios.post("http://localhost:8080/api/newTask",task)
    .then((response)=>
    {
      console.log("Todo bien!!!!!!!")
      console.log(response.data.id)
      setErrorMessage("")
      window.location.href=`/dashboard/${response.data.id}`
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
      <button onClick={()=>createAssignment()}>Submit new assignment</button>
    </div>
  )
}
