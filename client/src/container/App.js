import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import DragAndDropForm from '../components/DragAndDropForm';
import AddThing from '../components/AddThing';
import Navbar from '../components/Navbar';
import About from '../components/About';
import GRForms from '../components/GRForms';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Profile from '../components/Profile';

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
				<Navbar user={this.state.user} clearUser={this.setUser} />

				{/* <Switch> */}
				<Route exact path="/" render={(props) => <AddThing {...props} className="class-home" />} />
				<Route exact path="/search/:id" render={(props) => <DragAndDropForm {...props} />} />
				<Route exact path="/search/:id" render={(props) => <GRForms user={this.state.user} {...props} />} />
				{/* </Switch> */}

				<Route
					path="/profile"
					render={(props) => <Profile {...props} setUser={this.setUser} user={this.state.user} />}
				/>
				<Route
					path="/signup"
					render={(props) => <Signup {...props} user={this.state.user} setUser={this.setUser} />}
				/>
				<Route
					path="/login"
					render={(props) => <Login {...props} user={this.state.user} setUser={this.setUser} />}
				/>
				<Route path="/about" render={(props) => <About />} />

				{/* <Route exact path="/search/:id" render={props => <Test {...props} />} /> */}
			</div>
		);
	}
}

export default App;
