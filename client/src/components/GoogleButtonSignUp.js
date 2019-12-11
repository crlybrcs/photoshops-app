import React from 'react';
import GoogleButton from 'react-google-button';
import GoogleLogin from 'react-google-login';
import Link from 'react-router-dom';

const GoogleButtonSignUp = (props) => {
	return (
		<div>
			<button type="button" class="btn btn-primary google-button btn-block">
				<a href={`${process.env.REACT_APP_API_URL || ''}/api/auth/google`}>Sign in with Google</a>
			</button>
		</div>
	);
};

export default GoogleButtonSignUp;
