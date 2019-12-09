import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import DragAndDropForm from '../components/DragAndDropForm';
import AddThing from '../components/AddThing';
import Navbar from '../components/Navbar';

import { NavLink } from 'react-bootstrap';
// import Home from "../components/Home";
import GRForms from '../components/GRForms';
// import Test from "../components/Test";
import Signup from '../components/Signup';
import Login from '../components/Login';

class App extends React.Component {
	state = {
		user: this.props.user
	};

	setUser = (user) => {
		this.setState({
			user: user
		});
	};
	render() {
		return (
			<div className="App">
				{/* <Home className="class-home" /> */}
				<Navbar />

				{/* <Switch> */}
				<Route exact path="/" render={(props) => <AddThing {...props} className="class-home" />} />
				{/* <Route path="/Login" component={Login} />
        <Route path="/SignUp" component={Signup} /> */}

				<Route exact path="/search/:id" render={(props) => <DragAndDropForm {...props} />} />

				<Route exact path="/search/:id" render={(props) => <GRForms {...props} />} />
				{/* </Switch> */}

				{/* <Route exact path="/search/:id" render={props => <Test {...props} />} /> */}
			</div>
		);
	}
}

export default App;
