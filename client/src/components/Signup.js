<<<<<<< HEAD
import React, { Component } from 'react';
import { signup } from './services/auth';
import { Alert, Form, Button } from 'react-bootstrap';

class Signup extends Component {
	//Everything here
	state = {
		username: '',
		password: '',
		error: ''
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		// event.preventDefault(event);
		console.log(event);
		signup(this.state.username, this.state.password).then((data) => {
			if (data.message) {
				// handle errors
				this.setState({
					error: data.message
				});
			} else {
				// no error
				// lift the data up to the App state
				this.props.setUser(data);
				// redirect to "/projects"
				this.props.history.push('/products');
			}
		});
	};

	//Functions here
	render() {
		//Everything that shows on browser here
		return (
			<div>
				<form className="form-main">
					<h2>Sign Up</h2>

					<div className="form-group">
						<label>First name</label>
						<input type="text" className="form-control" placeholder="Enter your first name" />
					</div>

					<div className="form-group">
						<label>Last name</label>
						<input type="text" className="form-control" placeholder="Enter your last name" />
					</div>

					<div className="form-group">
						<label>Email address</label>
						<input type="email" className="form-control" placeholder="Enter your email" />
					</div>

					<div className="form-group">
						<label
							onChange={(e) => {
								e.preventDefault();
								this.handleChange();
							}}
						>
							Password
						</label>
						<input type="password" className="form-control" placeholder="Enter password" />
					</div>

					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							this.handleSubmit(this.state.username, this.state.password);
						}}
						className="btn btn-dark btn-block"
					>
						Sign Up
					</button>
					<p className="forgot-password mt-2 text-center">
						Already registered? <a href="/login">Log in</a>
					</p>
				</form>
			</div>
		);
	}
=======
import React, { Component } from "react";
import { signup } from "./services/auth";
// import { Alert, Form, Button } from "react-bootstrap";

class Signup extends Component {
  //Everything here
  state = {
    username: "",
    password: "",
    email: "",
    error: ""
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.username, this.state.password);
    signup(this.state.username, this.state.password).then(data => {
      if (data.message) {
        // handle errors
        this.setState({
          error: data.message
        });
      } else {
        // no error
        // lift the data up to the App state
        this.props.setUser(data);
        // redirect to "/projects"
        this.props.history.push("/products");
      }
    });
  };

  //Functions here
  render() {
    //Everything that shows on browser here
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>Name</label>
            <input
              onChange={this.handleChange}
              name="username"
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>

          <div className="form-group">
            <label>username</label>
            <input
              onChange={this.handleChange}
              type="text"
              className="form-control"
              placeholder="username"
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              name="email"
              onChange={this.handleChange}
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label
            // onChange={e => {
            //   e.preventDefault();
            //   this.handleChange();
            // }}
            >
              Password
            </label>
            <input
              name="password"
              onChange={this.handleChange}
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            // onClick={e => {
            //   e.preventDefault();
            //   this.handleSubmit(this.state.username, this.state.password);
            // }}
            className="btn btn-primary btn-block"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="/Login">sign in?</a>
          </p>
        </form>
      </div>
    );
  }
>>>>>>> 22a40f2298de19423f4dbd6ed48bbb77b1176b68
}

export default Signup;
