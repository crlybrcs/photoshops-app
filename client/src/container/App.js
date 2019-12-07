import React from "react";
import "./App.css";
import Home from "../components/Home";
import { Route } from "react-router-dom";
import DragAndDropForm from "../components/DragAndDropForm";
import AddThing from "../components/AddThing";
import GRForms from "../components/GRForms";
import Test from "../components/Test";

function App() {
  return (
    <div className="App">
      {/* <Home className="class-home" /> */}
      <Route
        exact
        path="/"
        render={props => <AddThing {...props} className="class-home" />}
      />
      <Route
        exact
        path="/search/:id"
        render={props => <DragAndDropForm {...props} />}
      />
      <Route
        exact
        path="/search/:id"
        render={props => <GRForms {...props} />}
      />
      {/* <Route exact path="/search/:id" render={props => <Test {...props} />} /> */}
    </div>
  );
}

export default App;
