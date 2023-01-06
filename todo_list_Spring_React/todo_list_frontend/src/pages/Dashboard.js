import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useLocalState } from '../util/useLocalStorage';
import { Link, useParams } from 'react-router-dom';

export default function Dashboard() {

  
  const{categoryGiven}=useParams()

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
      id:"1",
      category_types:"General",
      user:user
    }
  );

  const[task,setTask]=useState(
    {
      title:"Nueva tarea react",
      description:"Tarea desde react",
      date:"2023-01-01",
      category:category
    }
  );
  const[litsOfTasks,setListOfTasks]=useState([])


  const createAssignment=async()=>
  {
      
      //setTask({...task,user:user,category:category})
      console.log("setTask:")
      console.log(task)
      console.log(task.category)
      
      await axios.post("http://localhost:8080/api/newTask",task)
      .then((response)=>
      {
        console.log("Todo bien!!!!!!!")
        console.log(response.data.id)
        setErrorMessage("")
        window.location.href=`/task/${response.data.id}`
      })
      .catch((error)=>
      {
        console.log("Error!!!!!!!!!!!!!!!")
        console.log(error.response.status);
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }


  useEffect(()=>
    {
      console.log("categoryGiven:");
      console.log(categoryGiven);
      getAllTasksByCategory();
    },[])

    const getAllTasksByCategory=async()=>
    {
      await axios.post(`http://localhost:8080/api/getAllTasksByCategory`,category)
      .then((response)=>
    {
      console.log("Todo bien!!!!!!!")
      console.log(response.data)
      setListOfTasks(response.data)
      setErrorMessage("")
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
      <h1>
        categoryGiven:{categoryGiven}
      </h1>


      <button onClick={()=>createAssignment()}>Submit new assignment</button>
      {
          litsOfTasks.map((task)=>(
            <div style={{textAlign:'center'}}>
              <div style={{margin:"2em"}}>
                <Link to={`/task/${task.id}`}>
                <div>{task.id}</div>
                <div>{task.date}</div>
                <div>{task.title}</div>
                <div>{task.description}</div>
                </Link>
              </div>
            </div>
        ))
        
      }
    </div>
  )
}
