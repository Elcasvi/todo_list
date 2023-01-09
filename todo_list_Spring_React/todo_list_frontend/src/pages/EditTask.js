import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Container , Row , Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

export default function EditTask() {
  const{id}=useParams()
  const[categoryName,setCategoryName]=useState("")
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

  const[litsOfCategories,setListOfCategories]=useState([])
  
  const[errorMessage,setErrorMessage]=useState("")

  useEffect(()=>
  {
    getAllCategories()
    getTask()
  },[])

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

  const changeCategory=(event)=>
  {
    console.log(event.target.name)
    console.log(event.target.innerText)
    console.log(category)
    console.log(category)
  }
  const exit=()=>
  {
     window.location.href=`/dashboard/${category.category}`
     //<button className="bg-danger btn btn-default btn-circle btn-xl text-light" type='submit' onClick={()=>exit()}variant="info" ><i className="bi bi-box-arrow-left"></i></button>
  }

  return (
    <div>
      <Container>
        <div className='bg-secondary rounded-3'>
          <div className='d-flex justify-content-start gap-5 p-3'>
            <h1  style={{fontWeight:"bold"}}>{category.category}</h1>
            <Dropdown >
              <Dropdown.Toggle className='text-light' variant="info" id="dropdown-basic">
               Add category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                 {
                litsOfCategories.map((categor)=>(
                    <Dropdown.Item name="changeCategoryTo" onClick={(event)=>changeCategory(event)}>{categor.category}</Dropdown.Item>
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
              <div style={{marginTop:"2em"}}>
                <button className="bg-info btn btn-default btn-circle btn-xl text-light" onClick={()=>saveTask()}><i className="bi bi-check-circle"></i></button>
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
