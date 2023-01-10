import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function Dashboard() {

  const [flag,setFlag]=useState(false)
  const{categoryGiven}=useParams()

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

  const[litsOfCategories,setListOfCategories]=useState([])

  const[litsOfTasks,setListOfTasks]=useState([])


  useEffect(()=>
    {
      getAllCategories();
      getCategory();
    },[])

  useEffect(()=>
  {
    if(flag==true)
    {
      getAllTasksByCategory();
    }
  },[flag])

  const createTask=async()=>
  {
       window.location.href=`/newTask/${categoryGiven}`
  }
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
  const getCategory=async()=>
  {
    await axios.post(`http://localhost:8080/api/findCategoryByCategoryAndUser/${categoryGiven}`,user)
    .then((response)=>
      {
        setErrorMessage("")
        setCategory(response.data)
        setFlag(true)
      })
      .catch((error)=>
      {
        setErrorMessage(error.response.status)
        alert(error.response.status)
      });
  }

    const getAllTasksByCategory=async()=>
    {
      await axios.post(`http://localhost:8080/api/getAllTasksByCategory`,category)
    .then((response)=>
    {
     console.log(response.data)
      setListOfTasks(response.data)
      setErrorMessage("")
    })
    .catch((error)=>
    {
      
      setErrorMessage(error.response.status)
      alert(error.response.status)
      //onClick={()=>createTask()}
    });
    }

    
  return (
    <div>
      <Container>
      <div className='mt-2'>
        <Row>   
              {
                litsOfCategories.map((categor)=>(
                    <Col xs lg="2" className='listofCategoriesBody mb-5'><button className="btn rounded-pill bg-info text-light " type='submit' onClick={()=>window.location.href=`/dashboard/${categor.category}`}>{categor.category}</button></Col>
                ))
              }
        </Row>
      </div>
        <h1 className="pb-3" style={{fontWeight:"bold"}}>
          {categoryGiven}
        </h1>
        <div className='mb-3'>
          <Link className="bg-info btn btn-default btn-circle btn-xl text-light"to={`/newTask/${categoryGiven}`}><i class="bi bi-plus-lg"></i></Link>
        </div>
        <Row>
          {
              litsOfTasks.map((task)=>(
                <Col sm={12} md={6} lg={4} xl={3}>
                  <Card className='bg-secondary rounded-3 m-4'style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><h3>{task.title}</h3></Card.Title>
                      <Card.Subtitle className="mb-2">{task.date}</Card.Subtitle>
                      <Card.Text>{task.description}</Card.Text>
                    </Card.Body>
                          <div className='d-flex justify-content-end m-3'>
                           <Link className="d-flex justify-content-center bg-info btn btn-default btn-circle btn-md text-light" to={`/task/${task.id}`}><i class="bi bi-pencil-square"></i></Link>
                          </div>
                  </Card>
                </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  )
}
