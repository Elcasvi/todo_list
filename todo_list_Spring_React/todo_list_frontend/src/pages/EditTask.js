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
      fileKey:"",
      fileUrl:"",
      category:category
    }
  )
  const [image,setImage]=useState(null)
  const[fileKey,setFileKey]=useState(null)
  const[fileUrl,setFileUrl]=useState(null)
  const[file,setFile]=useState("")
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
    if(task.fileUrl!="")
    {
      setImage(task.fileUrl)
    }
    else{
      setImage(null)
    }
  },[task.fileUrl])

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
        console.log("response.data get taskY")
        console.log(response.data)
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

  
  const onInputChange=(event)=>
  {
    setTask({...task,[event.target.name]:event.target.value})
  }

  const onInputFileChange=(event)=>
  {
    setFile(event.target.files[0])
  }

  const saveTask=async()=>
  {
    if(file!="")
    {
      getFileData(file)
    }
    else{
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
        url:"http://localhost:8080/api/s3/uploadFile",
        method:"POST",
        data:formData
      }
    )
    .then((response)=>
    {
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
  const changeCategory=(event,categoryId,categoryName)=>
  {
    console.log(categoryId)
    console.log(categoryName)
    setCategory({...category,id:categoryId,category:categoryName,user:user})
    setFlag(true)
  }

  const deleteTask=async()=>
  {
    deleteFile();
    await axios.post(`http://localhost:8080/api/deleteTask`,task)
      .then((response)=>
        {
          console.log(response.data)
          setErrorMessage("")
          window.location.href=`/dashboard/${category.category}`
        })
        .catch((error)=>
        {
          console.log(error.response.status);
          setErrorMessage(error.response.status)
          alert(error.response.status)
        });
  }

  const deleteFile=async()=>
  {
    const key=task.fileKey
    console.log("deletingFileKey:")
    console.log(key)
    console.log("Dentro de deleteFile")
    await axios.delete(`http://localhost:8080/api/s3/deleteFile/${key}`)
      .then((response)=>
        {
          setTask({...task,fileKey:"",fileUrl:""})
          console.log("response.data deletefile:")
          console.log(response.data)
          setErrorMessage("")
        })
        .catch((error)=>
        {
          console.log(error.response.status);
          setErrorMessage(error.response.status)
          alert(error.response.status)
        });
  }

  const deleteImage=()=>
  {
    setImage(null)
  }

useEffect(()=>
  {
    if(fileKey!=null)
    {
      const changedTask={
      id:task.id,
      date:task.date,
      title:task.title,
      description:task.description,
      fileKey:"",
      fileUrl:"",
      category:category
      }
      changedTask.fileKey=fileKey
      changedTask.fileUrl=fileUrl

      console.log("changedTask:")
      console.log(changedTask)
      axios.put(`http://localhost:8080/api/updateTask`,changedTask)
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
  },[fileKey])
  
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
                  <div>
                      <img src={image} class="rounded mx-auto d-block taskImage" alt="..."></img>
                      <button className="bg-danger btn btn-default btn-circle btn-md text-light mt-2" type='submit' onClick={()=>deleteImage()} variant="info" ><i class="bi bi-trash3"></i></button>
                  </div>
                ):
                <div className='d-flex justify-content-center'>
                  <input type="file" name="file" onChange={(event)=>onInputFileChange(event)}></input>
                  </div>
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
