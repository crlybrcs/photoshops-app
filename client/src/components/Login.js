import React, { Component } from "react";
import { login } from "../services/auth";
// import { Alert, Form, Button } from "react-bootstrap";

class Login extends Component {
  //Everything here
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    login(this.state.username, this.state.password).then(data => {
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
        this.props.history.push("/projects");
      }
    });
  };
  //Functions here
  render() {
    return (
      <div>
        <h2>Login Here</h2>
      </div>
    );
    //Everything that the browser sees
  }
}

export default Login;
