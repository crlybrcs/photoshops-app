import React, { Component } from 'react';
import { signup } from './services/auth';
import { Alert, Form, Button } from 'react-bootstrap';
import GoogleButtonSignUp from './GoogleButtonSignUp';

class Signup extends Component {
	//Everything here
	state = {
		username: '',
		password: '',
		error: ''
	};

	handleChange = (event) => {
		this.setState(
			{
				[event.target.name]: event.target.value
			},
			() => console.log(this.state)
		);
	};

	handleSubmit = (event) => {
		event.preventDefault(event);

		signup(this.state.username, this.state.password).then((data) => {
			if (data.message) {
				// handle errors
				this.setState({
					error: data.message
				});
			} else {
				console.log('no error', data);
				// no error
				// lift the data up to the App state
				this.props.setUser(data);
				// redirect to "/projects"
				this.props.history.push('/');
			}
		});
	};

	//Functions here
	render() {
		//Everything that shows on browser here
		return (
			<div>
				<form onSubmit={this.handleSubmit} className="form-main">
					<h2>Sign Up</h2>

					<div className="form-group">
						<label>Username:</label>
						<input
							onChange={this.handleChange}
							type="text"
							name="username"
							value={this.state.username}
							className="form-control"
							placeholder="Enter your first name"
						/>
					</div>

					<div className="form-group">
						<label
						// onChange={(e) => {
						// 	e.preventDefault();
						// 	this.handleChange();
						// }}
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							className="form-control"
							onChange={this.handleChange}
							placeholder="Enter password"
						/>
					</div>

					{/* <div className="form-group">
						<label>Last name</label>
						<input type="text" className="form-control" placeholder="Enter your last name" />
					</div> */}

					<button
						type="submit"
						// onClick={(e) => {
						// 	e.preventDefault();
						// 	this.handleSubmit(this.state.username, this.state.password);
						// }}

						className="btn btn-dark btn-block"
					>
						Sign Up
					</button>
					<GoogleButtonSignUp />
					<p className="forgot-password mt-2 text-center">
						Already registered? <a href="/login">Log in</a>
					</p>
					{this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
				</form>
			</div>
		);
	}
}

export default Signup;
