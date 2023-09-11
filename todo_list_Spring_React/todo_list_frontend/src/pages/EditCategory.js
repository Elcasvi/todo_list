import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

export default function EditCategory() {
  
  const[errorMessage,setErrorMessage]=useState("")
  const{id}=useParams()
  const[user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );

  let [categoryName,setCategory]=useState(
    {
      id:id,
      category:"",
      user:user
    }
  );

  const{category}=categoryName

  const getCategory=async()=>
  {
    console.log("Dentro de getcategory")
     await axios.post(`https://appservicetodolistbackend.azurewebsites.net/api/findCategoryByCategoryIdAndUser/${id}`,user)
    .then((response)=>
      {
        setCategory(response.data)
        categoryName=response.data.category
        console.log(response.data)
        setErrorMessage("")
      })
      .catch((error)=>
      {
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }

  useState(()=>
  {
    getCategory();
  },[])

  const onInputChange=(event)=>
  {
    setCategory({...category,[event.target.name]:event.target.value})
  }

  
  const saveCategory=async()=>
  {
    const newCategory={
      id:id,
      category:"",
      user:user
    }
    
    newCategory.category=categoryName.category
    console.log(newCategory)
    await axios.put(`https://appservicetodolistbackend.azurewebsites.net/api/updateCategory`,newCategory)
    .then((response)=>
      {
        console.log(response.data)
        setErrorMessage("")
        window.location.href=`/dashboard/General`
      })
      .catch((error)=>
      {
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }

  return (
    <div>
      <Container>
        <div className='bg-secondary rounded-3'>
          <h1 className="p-3" style={{fontWeight:"bold"}}>{category}</h1>
          <div style={{textAlign:'center',padding:"30px"}}>

            <div className='d-flex justify-content-center'>
              <h1><i class="bi bi-blockquote-right"></i></h1>
              <input className='bg-secondary taskTitle' placeholder='Category' type="text" name="category" value={category} onChange={(event)=>onInputChange(event)}></input>
            </div>

            <div>
              <button className="bg-info btn btn-default btn-circle btn-xl text-light" onClick={()=>saveCategory()}><i className="bi bi-check-circle"></i></button>
            </div>
            
            <div className="d-flex justify-content-start mt-5">
                <Link className="bg-danger btn btn-default btn-circle btn-xl text-light" type='submit' to={`/dashboard/General`} variant="info" ><i className="bi bi-box-arrow-left"></i></Link>
              </div>

          </div>
        </div>
      </Container>
    </div>
  )
}
