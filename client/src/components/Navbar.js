import React, { Component } from 'react';
import { Navbar as Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import About from './About';
// import { Login } from "../components/Login";

export default class Navbar extends Component {
	render() {
		return (
			<Nav collapseOnSelect className="navbar navbar-default" fixed="top" expand="lg" bg="dark" variant="dark">
				<Nav.Brand href="/">Photoshops</Nav.Brand>
				<Nav.Toggle aria-controls="responsive-navbar-nav" />
				<Nav.Collapse id="responsive-navbar-nav">
					<Nav className="navbar-nav ml-auto">
						<NavLink className="nav-item nav-link active pr-2" to="/Signup">
							Sign up
						</NavLink>
						<NavLink className="nav-item nav-link active pr-2" to="/Login">
							Login
						</NavLink>
						<NavLink className="nav-item nav-link active pr-2" to="/about">
							About
						</NavLink>
					</Nav>
				</Nav.Collapse>
			</Nav>
		);
		// {
		/* //<Nav class="navbar navbar-expand-lg navbar-light bg-light">
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
			// </Nav> */
		// }
	}
}
