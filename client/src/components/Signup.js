import React, { Component } from "react";
import { signup } from "../services/auth";
import { Alert, Form, Button } from "react-bootstrap";

class Signup extends Component {
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

    signup(this.state.username, this.state.password).then(data => {
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
        this.props.history.push("/products");
      }
    });
  };

  //Functions here
  render() {
    //Everything that shows on browser here
    return (
      <div>
        <h2>Sign Up Here!</h2>
      </div>
    );
  }
}

export default Signup;
