import React, { Component } from "react";
import { Navbar as Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "./services/auth";
// import { Login } from "../components/Login";
import Profile from "./Profile";
import WelcomePage from "./WelcomePage";

const Navbar = props => {
  const { user } = props;
  const handleLogout = () => {
    logout();
    props.clearUser(null);
  };

  return (
    <Nav
      collapseOnSelect
      className="navbar navbar-default bg-faded"
      sticky="top"
      expand="lg"
      bg="light"
      variant="light"
    >
   
      <Nav.Brand>
        {/* <Link className="navbar-main" to="/">Photoshops</Link> */}
        <NavLink className="nav-item navbar-main nav-link " to="/">Photoshops</NavLink>
      </Nav.Brand>
      <Nav.Toggle aria-controls="responsive-navbar-nav" />
      <Nav.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto justify-content-center p-0">
          {props.user ? (
            <>
              {/* <h4>{props.user.name}</h4> */}
              <Link to="/about" className="nav-item nav-link active">
                About
              </Link>
              <Link to="/profile" className="nav-item nav-link active">
                Profile
              </Link>
              {/* <Link to="/welcomepage" className="nav-item nav-link active">Welcome</Link> */}
              <Link
                className="nav-item nav-link active"
                to="/favorites"
                // user={this.user}
              >
                Favorites
              </Link>
              <Link
                to="/"
                className="nav-item nav-link active"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </>
          ) : (
            <React.Fragment>
              {/* <a className="nav-item nav-link active pr-2" href={`${process.env.REACT_APP_API_URL || ""}/api/auth/google`}>Google Sign in</a> */}

              <NavLink className="nav-item nav-link active pr-2" to="/signup">
                Signup
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
};

export default Navbar;
