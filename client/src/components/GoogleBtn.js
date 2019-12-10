import React, { Component } from "react";
import ReactDOM from "react-dom";
import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";

ReactDom.render(
  <GoogleAPI
    clientId="189426553980-qh8qad9o0v48mtk8m07m981gfggereva.apps.googleusercontent.com"
    onUpdateSigninStatus={CALLBACK}
    onInitFailure={CALLBACK}
  >
    <div>
      <div>
        <GoogleLogin />
      </div>
      <div>
        <GoogleLogout />
      </div>
    </div>
  </GoogleAPI>,
  document.getElementById("root")
);
