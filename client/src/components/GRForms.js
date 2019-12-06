import React, { Component } from "react";
import GResource from "./GResource";

class GRForms extends Component {
  //pass array here!!!!
  state = {
    recommendations: [1, 2, 3, 4, 5, 6, 6]
  };

  getData = () => {};

  // What do we want here?
  // keywordArray = keywordArray.slice(0, 15);

  render() {
    return (
      <div className="Container">
        <div className="FormKeyWords">
          <ul>
            {this.state.recommendations.map(keyword => {
              return (
                <li>
                  <GResource name="Name" />
                  {/* <Link to="googleApiRoute/keywords">keyword</Link>
        <button type="submit">Remove</button> */}
                </li>
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
