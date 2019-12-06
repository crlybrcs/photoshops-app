import React from 'react';
import './App.css';
import Home from '../components/Home';
import { Route } from 'react-router-dom';
import DragAndDropForm from '../components/DragAndDropForm';
import AddThing from '../components/AddThing';

function App() {
	return (
		<div className="App">
			{/* <Home className="class-home" /> */}
			<Route exact path="/" render={(props) => <AddThing {...props} className="class-home" />} />
			<Route exact path="/search/:id" render={(props) => <DragAndDropForm {...props} />} />
		</div>
	);
}

export default App;
