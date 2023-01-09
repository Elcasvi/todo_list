import React from 'react'
import axios from 'axios';
import { useLocalState } from '../util/useLocalStorage';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Button } from 'bootstrap';

export default function Register() {
  const[saveUserVar,setSaveUserVar]=useState(false);

    const [user,setUser]=useLocalState(
    {
      id:0,
      username:"",
      password:""
    }
  );
  
  const{username,password}=user    
  const[errorMessage,setErrorMessage]=useState(null)

  useEffect(()=>
  {
    setUser({...user,id:0,username:"",password:""})
  },[])
   useEffect(()=>{
    if(saveUserVar==true)
    {
      createNewCategory()
    }
  },[saveUserVar]);

  const onInputChange=(event)=>
  {
    setUser({...user,[event.target.name]:event.target.value});
  }

  const sendLoginRequest=()=>
  {
    saveUser()
  }
  
  const saveUser=()=>
  {
    axios.post("http://localhost:8080/api/register",user)
    .then((response)=>
    {
      console.log(response.data)
      setErrorMessage("")
      setUser(response.data)
      setSaveUserVar(true)
      window.location.href="/login"
    })
    .catch((error)=>
    {
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }


  const createNewCategory=async()=>
  {
    const category=
    {
      category:"General",
      user:user
    }
    
    await axios.post("http://localhost:8080/api/newCategory",category)
    .then((response)=>
    {
      console.log(response.data)
      setErrorMessage("")
      setUser(response.data)
    })
    .catch((error)=>
    {
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }
const exit=()=>
  {
    window.location.href="/"
  }
  return (
    <div>
      <Container>
        <div className='bg-secondary rounded-3'style={{textAlign:'center',padding:"30px"}} >
          <div>
            <h1 style={{fontWeight:"bold",paddingBottom:"25px"}}>Todo_list<i class="bi bi-check-all"></i></h1>
            <h3 style={{fontWeight:"bold"}}>Register<i class="bi bi-check"></i></h3>
          </div>
          <Row>
            <Col>
          <div>
              <i className="bi bi-person-fill"></i>
              <input  className='bg-secondary username'  placeholder='username' type="text" name="username" value={username} onChange={(event)=>onInputChange(event)}></input>
          </div>
          </Col>
          </Row>
          <br/>
          <Row>
            <Col>
          <div >
              <i className="bi bi-person-fill-lock"></i>
              <input className='bg-secondary password' placeholder='password' type="password" name="password" value={password} onChange={(event)=>onInputChange(event)}></input>
          </div>
          </Col>
          </Row>

          <Row>
            <Col>
          <div >
            <button className="bg-info btn btn-default btn-circle btn-xl" type='submit' onClick={(event)=>sendLoginRequest(event)} to="/dashboard" ><i class="bi bi-check-circle"></i></button>
          </div>
          </Col>
          </Row>

          <Row>
            <Col>
              <div className="d-flex justify-content-start mt-5">
                <button className="bg-danger btn btn-default btn-circle btn-xl" type='submit' onClick={()=>exit()}variant="info" ><i className="bi bi-box-arrow-left"></i></button>
              </div>
              </Col>
          </Row>


          <div>
            {errorMessage!==""&&<h2>{errorMessage}</h2>}
          </div>
        </div>
        </Container>
    </div>
  )
}
