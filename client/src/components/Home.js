import React, { Component } from 'react';
import AddThing from './AddThing';
class Home extends React.Component {
	render() {
		return (
			<div className="container">
				<AddThing />
			</div>
		);
	}
}

export default Home;
