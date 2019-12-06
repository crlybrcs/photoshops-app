// components/AddThing.js
import React, { Component } from 'react';

// import the service file since we need them to send (and get) the data to(from) server
import { handleUpload, saveNewThing } from '../api/service';

class AddThing extends Component {
	state = {
		imageUrl: '',
		uploadOn: false
	};

	// this method handles just the file upload
	handleFileUpload = (e) => {
		console.log('The file to be uploaded is: ', e.target.files[0]);

		const uploadData = new FormData();
		// imageUrl => this name has to be the same as in the model since we pass
		// req.body to .create() method when creating a new thing in '/api/things/create' POST route
		uploadData.append('imageUrl', e.target.files[0]);

		handleUpload(uploadData)
			.then(this.setState({ uploadOn: true }))
			.then((response) => {
				console.log('response is: ', response);
				// after the console.log we can see that response carries 'secure_url' which we can use to update the state
				this.setState({ imageUrl: response.secure_url, uploadOn: false }, () =>
					console.log(this.state.imageUrl)
				);
			})
			.catch((err) => {
				console.log('Error while uploading the file: ', err);
			});
	};

	// this method submits the form
	handleSubmit = (e) => {
		e.preventDefault();

		if (this.state.uploadOn) return; // do nothing if the file is still being uploaded

		saveNewThing(this.state)
			.then((res) => {
				console.log('added: ', res);
				// here you would redirect to some other page
				console.log('doneee');
				this.props.history.push(`/search/${res._id}`);
			})
			.catch((err) => {
				console.log('Error while adding the thing: ', err);
			});
	};

	render() {
		const imageCheck = (
			<div>
				<img src={this.state.imageUrl} style={{ width: '50%' }} />
				<h1>Is this your final image? MUAHAHAHAHAHAH</h1>
			</div>
		);
		console.log(this.props);
		return (
			<div>
				<h2>New Thing</h2>

				<form onSubmit={(e) => this.handleSubmit(e)}>
					<input type="file" onChange={(e) => this.handleFileUpload(e)} />
					{this.state.uploadOn && <h3>Loading...</h3>}
					{this.state.imageUrl && (
						<button type="submit" disabled={this.state.uploadOn}>
							Save new thing
						</button>
					)}
				</form>
				{this.state.imageUrl && imageCheck}
			</div>
		);
	}
}

export default AddThing;
