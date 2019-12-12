import React from "react";
import GoogleButton from "react-google-button";
import GoogleLogin from "react-google-login";
import {Link} from "react-router-dom";

const AmazonBtnSignUp = props => {
  return (
    <div>
      <button type="button" >
        <a href={`${process.env.REACT_APP_API_URL || ""}/api/auth/amazon`}>
          <img
            border="0"
            alt="Login with Amazon"
            src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
            width="156"
            height="32"
          />
        </a>
      </button>
    </div>
  );
};

export default AmazonBtnSignUp;

/*  <a href id="LoginWithAmazon">
    <img border="0" alt="Login with Amazon"
        src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
        width="156" height="32" />
 </a> */
