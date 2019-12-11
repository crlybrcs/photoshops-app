import React from 'react';
import GoogleButton from 'react-google-button';
import GoogleLogin from 'react-google-login';
import Link from "react-router-dom"

const GoogleButtonSignUp = (props) => {
	return (
		<div>
      <GoogleButton
        <a
				className="nav-item nav-link active pr-2"
        href={`${process.env.REACT_APP_API_URL || ''}/api/auth/google`}
      >
        Google Sign in
			</a>
      />
		</div>
	);
};
