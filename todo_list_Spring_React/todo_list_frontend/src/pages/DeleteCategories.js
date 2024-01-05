import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {BASE_URL} from "../config";

export default function DeleteCategories() {
    const[user,setUser]=useLocalState(
    {
      id:"",
      username:"",
      password:""
    }
  );
  
  const[errorMessage,setErrorMessage]=useState("")

    useEffect(()=>
    {
        getCategories();
    },[])
    const [listOfCategories,setListOfCategories]=useState([])
    
    const getCategories=async()=>
    {
        await axios.post(BASE_URL+"/api/getAllCategoriesByUser",user)
         .then((response)=>
        {
          setErrorMessage("")
          setListOfCategories(response.data)
          console.log(response.data)
        })
        .catch((error)=>
        {
          setErrorMessage(error.response.status)
          alert(error.response.status)
        });
    }

    const deleteCategory=async(selectedCategory)=>
    {
        await axios.post(BASE_URL+"/api/deleteCategory",selectedCategory)
         .then((response)=>
        {
          setErrorMessage("")
          window.location.reload(false);
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
            <div>       
                    <Row>
                        {
                            listOfCategories.map((category)=>(
                                <Col sm={12} md={6} lg={4} xl={3}>
                                    <Card className='bg-secondary rounded-3 m-4'style={{ width: '18rem' }}>
                                        <Card.Body className='d-flex justify-content-between'>
                                        <Card.Title><h3>{category.category}</h3></Card.Title>
                                        <Card.Subtitle className="mb-2"></Card.Subtitle>
                                        <Card.Text>
                                          {
                                            category.category!=="General"?(
                                              <div class="dropdown" variant="danger" >
                                                <button class="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu bg-secondary">
                                                    <li><button class="dropdown-item text-info fw-bolder" onClick={()=>deleteCategory(category)}>Delete</button></li>
                                                    <li><Link class="dropdown-item text-info fw-bolder"to={`/category/${category.id}`}>Edit</Link></li>
                                                </ul>
                                            </div>
                                            ):null
                                          }
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <div className="mt-5">
                      <Link className="bg-danger btn btn-default btn-circle btn-xl text-light" type='submit' to={`/dashboard/General`} variant="info" ><i className="bi bi-box-arrow-left"></i></Link>
                    </div>
            </div>
        </Container>
    </div>
  )
}
