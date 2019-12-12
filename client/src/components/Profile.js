import React, { Component } from 'react';
import { login } from '../components/services/auth';
import { Alert, Form, Button, Col } from 'react-bootstrap';

class Profile extends React.Component {
	render() {
		return (
			<div className="box-profile">
				<Form className="form-class profile">
					<Form.Group controlId="formBasicEmail">
						<Form.Label className="label-name">Name</Form.Label>
						<Form.Control type="name" placeholder="Enter your name" />

						<Form.Label className="label-surname">Surname</Form.Label>
						<Form.Control type="surname" placeholder="Enter your surname" />

						<Form.Label className="label-email">Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />

						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="dark" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default Profile;
