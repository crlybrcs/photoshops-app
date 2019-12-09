import React from "react";
import "./App.css";
// import Home from '../components/Home';
import { Route } from "react-router-dom";
import DragAndDropForm from "../components/DragAndDropForm";
import AddThing from "../components/AddThing";
import Navbar from "../components/Navbar";
import { Switch } from "react-router-dom";
// import { NavLink } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      {/* <Home className="class-home" /> */}
      {/* <Navbar/> */}

      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <AddThing { ...props } className="class-home" />}
        />
        <Route path="/Login" components={ Login } />
        <Route path="/SignUp" components={ Signup } />

        <Route
          exact
          path="/search/:id"
          render={props => <DragAndDropForm { ...props } />}
        />
      </Switch>
    </div>
  );
}

export default App;
