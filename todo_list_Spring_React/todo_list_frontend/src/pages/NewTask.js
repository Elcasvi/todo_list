import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {BASE_URL} from "../../config";

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

const[file,setFile]=useState("")
const[fileKey,setFileKey]=useState(null)
const[fileUrl,setFileUrl]=useState(null)

const[task,setTask]=useState(
    {
      title:"",
      description:"",
      date:"",
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
    const res=await axios.post(BASE_URL+`/api/findCategoryByCategoryAndUser/${categoryGiven}`,user)
    setCategory(res.data)
  }


  const onInputChange=(event)=>
  {
    setTask({...task,[event.target.name]:event.target.value});
  }

  const onInputFileChange=(event)=>
  {
    setFile(event.target.files[0])
  }



  const sendTaskRequest=async()=>
  {
    if(file!="")
    {
      getFileData(file)
    }
    else
    {
      setFileKey("")
      setFileUrl("")
    }
  }

  const getFileData=async(file)=>
  {
    let formData=new FormData()
    formData.append('file',file)
    await axios(
      {
        url:BASE_URL+"/api/s3/uploadFile",
        method:"POST",
        data:formData
      }
    )
    .then((response)=>
    {
      console.log(response.data)
      setFileKey(response.data.key)
      setFileUrl(response.data.url)
      setErrorMessage("") 
    })
    .catch((error)=>
    {
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }

  useEffect(()=>
  {
    if(fileKey!=null)
    {
        const setingTask={
        title:"",
        description:"",
        date:"",
        fileKey:"",
        fileUrl:"",
        category:null
      }
      setingTask.title=task.title
      setingTask.description=task.description
      setingTask.date=task.date
      setingTask.category=category
      setingTask.fileKey=fileKey
      setingTask.fileUrl=fileUrl

      console.log("setingTask:")
      console.log(setingTask)
      axios.post(BASE_URL+"/api/newTask",setingTask)
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
  },[fileKey])

  return (
    <div>
      <Container>
        <div className='bg-secondary rounded-3'>
          <h1 className="p-3" style={{fontWeight:"bold"}}>{category.category}</h1>
          <div style={{textAlign:'center',padding:"30px"}}>
              <div className='d-flex justify-content-center'>
                  <h1><i class="bi bi-blockquote-right"></i></h1>
                  <input className='bg-secondary taskTitle' placeholder='Title' type="text" name="title" value={title} onChange={(event)=>onInputChange(event)}></input>
              </div>

              <div className='d-flex justify-content-center'>
                  <h1><i class="bi bi-body-text"></i></h1>
                  <textarea cols="25"className='bg-secondary taskDesc' placeholder='Description' type="text" name="description" value={description} onChange={(event)=>onInputChange(event)}></textarea>
              </div>

              <div className='d-flex justify-content-center'>
                  <input type="file" name="file" onChange={(event)=>onInputFileChange(event)}></input>
              </div>

              <div>
                <button className="bg-info btn btn-default btn-circle btn-xl text-light" type='submit' onClick={(event)=>sendTaskRequest(event)} to="/dashboard"><i className="bi bi-check-circle"></i></button>
              </div>
              
              <div className="d-flex justify-content-start mt-5">
                <Link className="bg-danger btn btn-default btn-circle btn-xl text-light" type='submit' to={`/dashboard/${category.category}`} variant="info" ><i className="bi bi-box-arrow-left"></i></Link>
              </div>
          </div>
        </div>
        </Container>
    </div>
  )
}
