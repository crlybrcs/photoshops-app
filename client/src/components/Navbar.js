import React, { Component } from "react";
import { Navbar as Nav } from "react-bootstrap";
import {NavLink} from 'react-router-dom';
// import { Login } from "../components/Login";

export default class Navbar extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink className= "d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
            <NavLink className= "d-inline p-2 bg-dark text-white" to="/Login">Log In</NavLink>
            <NavLink className= "d-inline p-2 bg-dark text-white" to="/Signup">Sign Up</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      // <Nav class="navbar navbar-expand-lg navbar-light bg-light">
      //   <a class="navbar-brand" href="#">
      //     PhotoShops
      //   </a>
      //   <button
      //     class="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarNavAltMarkup"
      //     aria-controls="navbarNavAltMarkup"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span class="navbar-toggler-icon"></span>
      //   </button>
      //   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      //     <div class="navbar-nav">
      //       <a
      //         class="nav-item nav-link active"
      //         href="../src/components/Home.js"
      //       >
      //         Home <span class="sr-only">(current)</span>
      //       </a>
      //       <a class="nav-item nav-link" href="#">
      //         Sign Up
      //       </a>
      //       <a class="nav-item nav-link" href="#">
      //         Log In
      //       </a>
      //       <a class="nav-item nav-link disabled" href="#">
      //         Profile
      //       </a>
      //     </div>
      //   </div>
      // </Nav>
    );
  }
}
