import React, { Component } from 'react';
import { login } from '../components/services/auth';
import { Alert, Form, Button, Col } from 'react-bootstrap';
import axios from 'axios';
import { UserRefreshClient } from 'google-auth-library';

class Profile extends React.Component {
	state = {
		name: this.props.name,
		surname: this.props.user.surname,
		email: this.props.user.email,
		message: ''
	};

	handleChange = (event) => {
		console.log('changing');
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	updateUser = (event) => {
		event.preventDefault();
		axios.post('/api/profile', this.state).then((response) => {
			console.log('RESPONSE DATA:', response.data);
			this.props.setUser(response.data);
			console.log('THIS.PROPS axios', this.props);
			console.log('RESPONSE MESSAGE', response.data.message);
			this.props.history.push('/profile');
			this.setState(
				{
					message: response.data.message
				},
				() => {
					setTimeout(() => {
						this.setState({ message: '' });
					}, 3000);
				}
			);
		});
	};

	render() {
		console.log('RENDER THIS PROPS', this.props);

		return (
			<div className="box-profile">
				<Form onSubmit={this.updateUser} className="form-class profile">
					<Form.Group>
						<Form.Label className="label-name">Name</Form.Label>
						<Form.Control
							type="text"
							name="name"
							id="name"
							value={this.state.name}
							onChange={this.handleChange}
							placeholder="Enter your name"
						/>

						<Form.Label className="label-surname">Surname</Form.Label>
						<Form.Control
							type="text"
							name="surname"
							id="surname"
							value={this.state.surname}
							onChange={this.handleChange}
							placeholder="Enter your surname"
						/>

						<Form.Label className="label-email">Email address</Form.Label>
						<Form.Control
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
							placeholder="Enter email"
						/>
					</Form.Group>
					<Button className="profile-submit" variant="dark" type="submit">
						Submit
					</Button>
				</Form>
				{this.state.message && (
					<div className="alert">
						<Alert variant="success">{this.state.message}</Alert>
					</div>
				)}
			</div>
		);
	}
}

export default Profile;
