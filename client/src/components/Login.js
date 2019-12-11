import React, { Component } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { login } from '../components/services/auth';
import GoogleButton from 'react-google-button';
import GoogleButtonSignUp from './GoogleButtonSignUp';

class Login extends Component {
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
		event.preventDefault();

		login(this.state.username, this.state.password).then((data) => {
			if (data.message) {
				// handle errors
				this.setState({
					error: data.message
				});
			} else {
				// no error
				// lift the data up to the App state
				this.props.setUser(data);
				// redirect to "/"
				this.props.history.push('/');
			}
		});
	};

	//Functions here
	render() {
		//Everything that the browser sees
		return (
			<div class="container">
				<h2 className="header-login">Login</h2>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label className="username-label" htmlFor="username">
							Username:
						</Form.Label>
						<Form.Control
							className="form-control"
							type="text"
							name="username"
							id="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor="password">Password: </Form.Label>
						<Form.Control
							className="form-control"
							type="password"
							name="password"
							id="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</Form.Group>
					{this.state.error && <Alert variant="danger">{this.state.error}</Alert>}

					<p className="forgot-password mt-2 text-center">
						Don't have an account yet? <a href="/signup">Signup</a>
					</p>

					<Button className="btn btn-dark btn-block submit" type="submit">
						Log in
					</Button>
					<div className="box">
						{/* <GoogleButton
							id="googleButton"
							type="dark"
							onClick={() => {
								console.log('Google Button clicked');
							}}
						/> */}
						<GoogleButtonSignUp>
							<a
								className="nav-item nav-link active pr-2"
								href={`${process.env.REACT_APP_API_URL || ''}/api/auth/google`}
							>
								Google Sign in
							</a>
						</GoogleButtonSignUp>
					</div>
				</Form>
			</div>
		);
	}
}

export default Login;
