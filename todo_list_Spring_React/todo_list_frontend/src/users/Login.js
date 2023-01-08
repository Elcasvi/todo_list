import React from 'react'
import axios from 'axios';
import { useLocalState } from '../util/useLocalStorage';
import { useState } from 'react';
import { Col, Container, Row ,Button} from 'react-bootstrap';
export default function Login() {
    const [user,setUser]=useLocalState(
    {
      id:0,
      username:"",
      password:""
    }
  );
  const{username,password}=user    
  const[errorMessage,setErrorMessage]=useState("")

  const onInputChange=(event)=>
  {
    setUser({...user,[event.target.name]:event.target.value});
  }

  const sendLoginRequest=()=>
  {
    getUser()
  }
  
  const getUser=()=>
  {
    axios.post("http://localhost:8080/api/login",user)
    .then((response)=>
    {
      setErrorMessage("")
      setUser(response.data)
      window.location.href=`/dashboard/General`
    })
    .catch((error)=>
    {
      console.log(error.response.status);
      setErrorMessage(error.response.status)
      alert(error.response.status)
    });
  }


  return (
    <div class="dark">
      <Container>
        <div className='bg-secondary'style={{textAlign:'center',padding:"30px"}} >
          <div>
            <h1 clas="pb-5" style={{fontWeight:"bold"}}>Todo_list<i class="bi bi-check-all"></i></h1>
            <h3 style={{fontWeight:"bold"}}>Log-in<i class="bi bi-check"></i></h3>
          </div>
        <Row>
          <Col>
            <div>
                <i class="bi bi-person-fill"></i>
                <input class='bg-secondary username'  placeholder='username' type="text" name="username" value={username} onChange={(event)=>onInputChange(event)}></input>
            </div>
             </Col>
        </Row>

        <Row>
          <Col>
            <div>
                <i class="bi bi-person-fill-lock"></i>
                <input class='bg-secondary password' placeholder='password' type="password" name="password" value={password} onChange={(event)=>onInputChange(event)}></input>
            </div>
            </Col>
        </Row>

        <Row>
          <Col>
            <div>
              <button class="bg-info btn btn-default btn-circle btn-xl" type='submit' onClick={(event)=>sendLoginRequest(event)}variant="info" ><i class="bi bi-check-circle"></i></button>
            </div>
            </Col>
        </Row>

        <Row>
          <Col>
            <div>
              {errorMessage!==""&&<h2>{errorMessage}</h2>}
            </div>
            </Col>
        </Row>
        </div>
      </Container>
    </div>
  )
}
