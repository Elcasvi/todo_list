import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useLocalState } from '../util/useLocalStorage';
import { Link, useParams } from 'react-router-dom';

export default function Dashboard() {

  const [flag,setFlag]=useState(false)
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
      id:"",
      category:"",
      user:null
    }
  );

  const[task,setTask]=useState(
    {
      title:"Nueva tarea react",
      description:"Tarea desde react",
      date:"2023-01-01",
      category:null
    }
  );


  const[litsOfTasks,setListOfTasks]=useState([])

  useEffect(()=>
    {
      getCategory();
    },[])

  useEffect(()=>
  {
    if(flag==true)
    {
      getAllTasksByCategory();
    }
  },[flag])

  const createAssignment=async()=>
  {
      console.log("category:")
      console.log(category)
      //setTask({...task,category:category})
      console.log("setTask:")
      console.log(task)
      console.log(task.category)
      
      await axios.post("http://localhost:8080/api/newTask",task)
      .then((response)=>
      {
        setErrorMessage("")
        //window.location.href=`/task/${response.data.id}`
      })
      .catch((error)=>
      {
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }


  const getCategory=async()=>
  {
    await axios.post(`http://localhost:8080/api/findCategoryByCategoryAndUser/${categoryGiven}`,user)
    .then((response)=>
      {
        setErrorMessage("")
        setCategory(response.data)
        setFlag(true)
      })
      .catch((error)=>
      {
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }

    const getAllTasksByCategory=async()=>
    {
      await axios.post(`http://localhost:8080/api/getAllTasksByCategory`,category)
      .then((response)=>
    {
     console.log(response.data)
      setListOfTasks(response.data)
      setErrorMessage("")
    })
    .catch((error)=>
    {
      
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
    }

  return (
    <div>
      <h1>
        categoryGiven:{categoryGiven}
      </h1>
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
