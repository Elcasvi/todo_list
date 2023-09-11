import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

export default function NewCategory() {
  const[errorMessage,setErrorMessage]=useState("")
  const[user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );

  const[category,setCategory]=useState(
    {
      categoryName:"",
      user:user
    }
  );
  const{categoryName}=category

  const onInputChange=(event)=>
  {
    setCategory({...category,[event.target.name]:event.target.value})
  }

  const createCategory=async()=>
  {

    const newCategory={
      category:"",
      user:null
    }
    newCategory.category=category.categoryName
    newCategory.user=category.user

    await axios.post(`https://appservicetodolistbackend.azurewebsites.net/api/newCategory`,newCategory)
    .then((response)=>
      {
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
          <h1 className="p-3" style={{fontWeight:"bold"}}>{category.categoryName}</h1>
          <div style={{textAlign:'center',padding:"30px"}}>

            <div className='d-flex justify-content-center'>
              <h1><i class="bi bi-blockquote-right"></i></h1>
              <input className='bg-secondary taskTitle' placeholder='Category' type="text" name="categoryName" value={categoryName} onChange={(event)=>onInputChange(event)}></input>
            </div>

            <div>
              <button className="bg-info btn btn-default btn-circle btn-xl text-light" onClick={()=>createCategory()}><i className="bi bi-check-circle"></i></button>
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
