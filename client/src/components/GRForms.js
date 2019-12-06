import React, { Component } from 'react';
import GResource from './GResource';
import Axios from 'axios';

class GRForms extends Component {
	//pass array here!!!!
	// state = {
	// 	labels: [],
	// 	textResults: '',
	// 	webResults: []
	// };

	// getData = () => {
	// 	const { id } = this.props.match.params;
	// 	console.log('this.props.match.params: ', id);

	// 	axios.get(`/googleApi/search/${_id}`).then((response) => {
	//     this.setState({
	//       labels: response.data.labels,
	//       textResults: response.data.textResults,
	//       description: response.data.webResults
	//     })
	// 		console.log('RESPONSE IN GRFORMS:', response);
	//   }).catch(err => {
	//     console.log(err)
	//   })
	// };

	// componentDidMount() {
	//   this.getData();
	// }

	render() {
		return (
			<div className="Container">
				<div className="FormKeyWords">
					<ul>
						{this.state.recommendations.map((keyword) => {
							return (
								<ul>
									<li>
										<GResource keyword="" />
										{/* <Link to="googleApiRoute/keywords">keyword</Link>
        <button type="submit">Remove</button> */}
									</li>
								</ul>
							);
						})}
					</ul>
					{/* <div>
            <div className="wrap">
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="What are you looking for?"
                >
                  <button type="submit" className="addButton">
                    <i className="fa fa-search"></i>
                  </button>
                </input>
                <button>ADD</button>
              </div>
            </div>
            <div className="InputAdd">input/add</div>
            <div className="KWsearch">Search button</div>
          </div>
          <div className="ImageEl">
            <img src={this.state.googleImage} />
          </div>
          */}
				</div>
			</div>
		);
	}
}

export default GRForms;
