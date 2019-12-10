import React from 'react';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import ReactDOM from 'react-dom';

const GoogleSignUp = (props) => {
	responseGoogle = async (response) => {};
};

ReactDOM.render(
	<div>
		<input type="text" placeholder="username" />
		<GoogleLogin buttonText="Login With Google" />
	</div>
);

export default GoogleSignUp;
