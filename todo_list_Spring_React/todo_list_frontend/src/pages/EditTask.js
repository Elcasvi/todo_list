import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';


export default function EditTask() {
  const{id}=useParams()
   const[user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );
  const[task,setTask]=useState(
    {
      id:0,
      date:"",
      title:"",
      description:"",
      category:null
    }
  )

  const{title,description}=task

  const[category,setCategory]=useState(
    {
      category:"",
      user:user
    }
  )

  const[errorMessage,setErrorMessage]=useState("")

  useEffect(()=>
  {
    getTask()
  },[])

  const getTask=async()=>
  {
    await axios.get(`http://localhost:8080/api/getTaskById/${id}`)
    .then((response)=>
      {
        console.log("Todo bien!!!!!!!")
        console.log(response.data.id)
        setErrorMessage("")
        setTask(response.data)
        setCategory(response.data.category)
      })
      .catch((error)=>
      {
        console.log("Error!!!!!!!!!!!!!!!")
        console.log(error.response.status);
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }
  const onInputChange=(event)=>
  {
    setTask({...task,[event.target.name]:event.target.value})
  
  }

  const saveTask=async()=>
  {
    await axios.put(`http://localhost:8080/api/updateTask`,task)
    .then((response)=>
      {
        console.log("Todo bien!!!!!!!")
        console.log(response.data.id)
        setErrorMessage("")
        setTask(response.data)
        setCategory(response.data.category)
        window.location.href=`/dashboard/${category.category}`
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
    <div style={{margin:"5em"}}>
      <h1>ViewTask</h1>
      <h2>id:{id}</h2>
      <h3>{category.category}</h3>
      <div>
        <label htmlFor='title'>Title:</label>
        <input name='title' value={title} type="text" onChange={(event)=>onInputChange(event)}></input>
      </div>

      <div>
        <label htmlFor='description'>Description:</label>
        <input name='description' value={description} type="text"onChange={(event)=>onInputChange(event)}></input>
      </div>
      <div style={{marginTop:"2em"}}>
      <button onClick={()=>saveTask()}>Submit task</button>
      </div>
    </div>
  )
}
