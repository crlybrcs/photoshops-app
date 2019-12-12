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
		// e.target - is <input type="file">
		// e.target.files gives a list of all files (here -> just one at position 0)

		const uploadData = new FormData();

		// imageUrl => this name has to be the same as in the model since we pass
		// req.body to .create() method when creating a new thing in '/api/things/create' POST route

		uploadData.append('imageUrl', e.target.files[0]);

		handleUpload(uploadData)
			.then(this.setState({ uploadOn: true }))
			.then((response) => {
				// after the console.log we can see that response carries 'secure_url' which we can use to update the state
				this.setState({ imageUrl: response.secure_url, uploadOn: false }, () =>
					console.log('this.state.imageUrl in handleUpload fc:', this.state.imageUrl)
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
				// here you would redirect to some other page

				this.props.history.push(`/search/${res._id}`);
			})
			.catch((err) => {
				console.log('Error while adding the thing: ', err);
			});
	};

	render() {
		const imageCheck = (
			<div>
				<img id="image" className="uploaded-img" src={this.state.imageUrl} alt="uploaded image" />
				<h3 className="final-image">Is this your final image?</h3>
			</div>
		);

		return (
			<div className="container-main">
				<h3 className="header-upload">Upload your picture</h3>

				<form onSubmit={(e) => this.handleSubmit(e)}>
					<div className="col-lg col-sm col-12">
						<label className="btn btn-file btn-dark browse">
							Browse
							<input className="input-field" type="file" onChange={(e) => this.handleFileUpload(e)} />
						</label>
					</div>
					{this.state.uploadOn && <h4 className="block-loading">Loading...</h4>}

					{this.state.imageUrl && imageCheck}
					{this.state.imageUrl && (
						<button
							className="btn-results btn btn-dark btn-block submit"
							type="submit"
							disabled={this.state.uploadOn}
						>
							Get the results
						</button>
					)}
				</form>
			</div>
		);
	}
}

export default AddThing;
