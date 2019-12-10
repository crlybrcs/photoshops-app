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
}

export default Signup;
