import React, { Component } from 'react';
import { Navbar as Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import About from './About';
import { logout } from './services/auth';
// import { Login } from "../components/Login";

const Navbar = props => {

  const handleLogout = () => {
    logout();
    props.clearUser(null);
  }
  
  
    return (
      <Nav collapseOnSelect className="navbar navbar-default" fixed="top" expand="lg" bg="dark" variant="dark">
            <Nav.Brand href="/">Photoshops</Nav.Brand>
        <Nav.Toggle aria-controls="responsive-navbar-nav basic-navbar-nav" />
            <Nav.Collapse id="responsive-navbar-nav">
          <Nav className="navbar-nav ml-auto">
            {props.user ? (
              <>
                <Link to="/about" className="nav-item nav-link active pr-2">About</Link>
                <Link to="/profile" className="nav-item nav-link active pr-2">Profile</Link>
                <Link to="/" className="nav-item nav-link active pr-2" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
                <React.Fragment>
                  {/* <a className="nav-item nav-link active pr-2" href={`${process.env.REACT_APP_API_URL || ""}/api/auth/google`}>Google Sign in</a> */}

                  <NavLink className="nav-item nav-link active pr-2" to="/signup">
                    Sign up
						</NavLink>
                  <NavLink className="nav-item nav-link active pr-2" to="/login">
                    Login
						</NavLink>
                  <NavLink className="nav-item nav-link active pr-2" to="/about">
                    About
						</NavLink>
                </React.Fragment>
              )}
              </Nav>
            </Nav.Collapse>
        
      </Nav>
    );
  
}

export default Navbar;
