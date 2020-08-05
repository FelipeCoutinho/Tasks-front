import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'


class index extends React.Component {
  render(){
    
    return(
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="index">Tasks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item as={Link} className="nav-link" to="/" >Inicio</Nav.Item>
            <Nav.Item as={Link} className="nav-link" to="/t" >Tarefas</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

export default index;