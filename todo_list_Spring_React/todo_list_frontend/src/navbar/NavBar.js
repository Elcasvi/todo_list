import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBar() {
  return (
      
<Navbar bg="primary" variant="primary" expand="lg">
      <Container>
          
        <Navbar.Brand className="text-light" style={{fontWeight:"bold"}} href="/dashboard/General">Todo_list<i class="bi bi-check-all"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="text-light"id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='text-light' href="/newCategory">Create category</Nav.Link>
            <Nav.Link className='text-light' href="/deleteCategories">Delete category</Nav.Link>
            <Nav.Link className='text-light' href="/deleteCategories">Edit category</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
