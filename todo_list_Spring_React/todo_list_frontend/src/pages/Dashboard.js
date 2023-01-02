import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useLocalState } from '../util/useLocalStorage';

export default function Dashboard() {
    const [user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );


  const[task,setTask]=useState(
    {
      title:"Nueva tarea",
      description:"Tarea desde react",
      date:"2023-01-01"
    }
  );

  const[category,setCategory]=useState(
    {
      category_type:"General"
    }
  );
  
  const createAssignment=async()=>
  {
    const tarea=await axios.post("http://localhost:8080/api/newTask",task,user,category)
    console.log("res:");
    console.log(tarea.data);
  }

  return (
    <div>
      <button onClick={()=>createAssignment()}>Submit new assignment</button>
    </div>
  )
}
