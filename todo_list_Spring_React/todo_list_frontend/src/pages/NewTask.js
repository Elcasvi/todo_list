import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { useParams } from 'react-router-dom';

export default function NewTask() {

  const{categoryGiven}=useParams()
  const [flag,setFlag]=useState(false)

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
      title:"",
      description:"",
      date:"2023-01-01",
      category:category
    }
  );

const[newTask,setNewTask]=useState(
    {
      title:"",
      description:"",
      date:"2023-01-01",
      category:category
    }
  );

  const{title,description}=task

  useEffect(()=>
  {
      getCategory();
  },[])


  const getCategory=async()=>
  {
    const res=await axios.post(`http://localhost:8080/api/findCategoryByCategoryAndUser/${categoryGiven}`,user)
    setCategory(res.data)
  }


  const onInputChange=(event)=>
  {
    setTask({...task,[event.target.name]:event.target.value});
  }

  const sendTaskRequest=async()=>
  {
    const setingTask=
    {
      title:"",
      description:"",
      date:"",
      category:null
    }
    setingTask.title=task.title
    setingTask.description=task.description
    setingTask.date=task.date
    setingTask.category=category

    await axios.post("http://localhost:8080/api/newTask",setingTask)
    .then((response)=>
    {
      console.log(response.data)
      setErrorMessage("") 
      window.location.href=`/dashboard/${categoryGiven}`
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
      categoryGiven:{categoryGiven}
      <br/>
      category id:{category.id}
      <br/>
      category:{category.category}
      <br/>
      <div>
            <label htmlFor='username'>Title</label>
            <input type="text" name="title" value={title} onChange={(event)=>onInputChange(event)}></input>
        </div>

        <div>
            <label htmlFor='username'>Description</label>
            <input type="text" name="description" value={description} onChange={(event)=>onInputChange(event)}></input>
        </div>
        <div>
          <button type='submit' onClick={(event)=>sendTaskRequest(event)} to="/dashboard">Register</button>
        </div>
        <div></div>
    </div>
  )
}
