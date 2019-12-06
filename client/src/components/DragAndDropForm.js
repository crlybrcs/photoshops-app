import React, { Component } from 'react';
import axios from 'axios';

class DragAndDropForm extends Component {
	state = {
		imageUrl: '',
		labels: [],
		textResults: [],
		webResults: [],
		loading: true
	};

	getData = () => {
		const { id } = this.props.match.params;
		console.log(id);
		axios.get(`/googleApi/search/${id}`).then((res) => {
			console.log(res.data);
			const { imageUrl, labels, textResults, webResults } = res.data;
			this.setState(
				{
					imageUrl,
					labels,
					textResults,
					webResults,
					loading: false
				},
				() => {
					console.log(this.state);
				}
			);
		});
	};

	componentDidMount = () => {
		this.getData();
	};
	render() {
		return (
			<div>
				{this.state.loading && <h2>Loading ....</h2>}
				Hello there
			</div>
		);
	}
}

export default DragAndDropForm;
