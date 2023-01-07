import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
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

    await axios.post(`http://localhost:8080/api/newCategory`,newCategory)
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
      <div>
        <label htmlFor='title'>Category Name:</label>
        <input name='categoryName' value={categoryName} type="text" onChange={(event)=>onInputChange(event)}></input>
      </div>
      <div>
        <button onClick={()=>createCategory()}>Accept</button>
      </div>
    </div>
  )
}
