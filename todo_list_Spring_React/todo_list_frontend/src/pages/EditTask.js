import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Container , Row , Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

export default function EditTask() {
  const{id}=useParams()
  const[flag,setFlag]=useState(false)
   const[user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );
  const [image,setImage]=useState(null)
  const[category,setCategory]=useState(
    {
      id:0,
      category:"",
      user:user
    }
  )

  const[task,setTask]=useState(
    {
      id:0,
      date:"",
      title:"",
      description:"",
      filePath:"",
      category:category
    }
  )

  const{title,description}=task
  const[litsOfCategories,setListOfCategories]=useState([])
  const[errorMessage,setErrorMessage]=useState("")

  useEffect(()=>
  {
    getAllCategories()
    getTask()
  },[])

  useEffect(()=>
  {
    if(task.filePath!="")
    {
      getFile()
    }
  },[task.filePath])

  const getAllCategories=async()=>
    {
      await axios.post(`http://localhost:8080/api/getAllCategoriesByUser`,user)
      .then((response)=>
        {
          setErrorMessage("")
          setListOfCategories(response.data)
        })
        .catch((error)=>
        {
          setErrorMessage(error.response.status)
          alert(error.response.status)
        });
    }
  const getTask=async()=>
  {
    await axios.get(`http://localhost:8080/api/getTaskById/${id}`)
    .then((response)=>
      {
        
        setErrorMessage("")
        setTask(response.data)
       
        setCategory(response.data.category)
      })
      .catch((error)=>
      {
        
        console.log(error.response.status);
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }

  const getFile=async()=>
  {
    console.log("task.filePath:")
    console.log(task.filePath)
    await axios.post(`http://localhost:8080/api/s3/getFile`,task.filePath)
    .then((response)=>
      {
        console.log(response)
        setErrorMessage("")
        setImage(response.data)
      })
      .catch((error)=>
      {
        
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
    const changedTask={
      id:task.id,
      date:task.date,
      title:task.title,
      description:task.description,
      category:category
    }
       await axios.put(`http://localhost:8080/api/updateTask`,changedTask)
      .then((response)=>
        {
          setErrorMessage("")
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

  const changeCategory=(event,categoryId,categoryName)=>
  {
    console.log(categoryId)
    console.log(categoryName)
    setCategory({...category,id:categoryId,category:categoryName,user:user})
    setFlag(true)
  }

  const deleteTask=async()=>
  {
    await axios.post(`http://localhost:8080/api/deleteTask`,task)
      .then((response)=>
        {
          console.log(response.data)
          setErrorMessage("")
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
    <div>
      <Container>
        <div className='bg-secondary rounded-3'>
          <div className='d-flex justify-content-start gap-5 p-3'>
            <h1  style={{fontWeight:"bold"}}>{category.category}</h1>
            <Dropdown >
              <Dropdown.Toggle className='text-light' variant="info" id="dropdown-basic">
               Change category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                 {
                litsOfCategories.map((categor)=>(
                    <Dropdown.Item  onClick={(event)=>changeCategory(event,categor.id,categor.category)}>{categor.category}</Dropdown.Item>
                ))
              }           
              </Dropdown.Menu>

            </Dropdown>
          </div>


            <div style={{textAlign:'center',padding:"30px"}}>
              <div className='d-flex justify-content-center'>
                <h1><i class="bi bi-blockquote-right"></i></h1>
                <input className='bg-secondary taskTitle' name='title' value={title} type="text" onChange={(event)=>onInputChange(event)}></input>
              </div>

              <div className='d-flex justify-content-center'>
                <h1><i class="bi bi-body-text"></i></h1>
                <textarea  cols="25" className='bg-secondary taskDesc' name='description' value={description} type="text"onChange={(event)=>onInputChange(event)}></textarea>
              </div>
              {
                image?(
                  <div className='d-flex justify-content-center'>
                  <img src={"https://app-todo-list-bucket.s3.us-west-1.amazonaws.com/549aaa9b-5b7e-4479-9a8a-23784fb2eac6.jpeg"} class="rounded mx-auto d-block" alt="..."></img>
                  </div>
                ):null
              }
              

              <div style={{marginTop:"2em"}}>
                <button className="bg-info btn btn-default btn-circle btn-xl text-light" onClick={()=>saveTask()}><i className="bi bi-check-circle"></i></button>
              </div>
              <div className="d-flex justify-content-between mt-5">
                <Link className="bg-danger btn btn-default btn-circle btn-xl text-light" type='submit' to={`/dashboard/${category.category}`} variant="info" ><i className="bi bi-box-arrow-left"></i></Link>
                <button className="bg-danger btn btn-default btn-circle btn-xl text-light" type='submit' onClick={(event)=>deleteTask(event)} variant="info" ><i class="bi bi-trash3"></i></button>
              </div>
              
            </div>
        </div>
      </Container>
    </div>
  )
}
