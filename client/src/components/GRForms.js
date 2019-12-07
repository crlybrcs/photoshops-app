import React, { Component } from "react";
import GResource from "./GResource";
import axios from "axios";

class GRForms extends Component {
  //pass array here!!!!
  state = {
    labels: [],
    textResults: "",
    webResults: [],
    imageUrl: ""
  };

  getData = () => {
    const { id } = this.props.match.params;
    console.log("this.props.match.params: ", id);

    axios
      .get(`/googleApi/search/${id}`)
      .then(response => {
        this.setState({
          labels: response.data.labels,
          textResults: response.data.textResults,
          webResults: response.data.webResults,
          imageUrl: response.data.imageUrl
        });
        console.log("RESPONSE IN GRFORMS:", response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { labels, textResults, webResults, imageUrl } = this.state;
    let fullMerge = labels.concat(webResults);

    let strArr;
    if (textResults) {
      strArr = textResults;
    } else {
      strArr = "";
    }

    let array = [];
    for (var key in fullMerge) {
      var value = fullMerge[key];
      array.push(value);
    }
    let finalArr = [...array, ...strArr];

    console.log(finalArr);

    return (
      <div className="Container">
        <div className="FormKeyWords">
          <ul>
            {finalArr.map((keyword, index) => {
              return (
                <ul>
                  <li key={index}>
                    {Object.values(keyword)}
                    {/* <GResource keyword="" /> */}
                    {/* <Link to="googleApiRoute/keywords">keyword</Link>
                    <button type="submit">Remove</button> */}
                  </li>
                </ul>
              );
            })}
          </ul>
          <img src={imageUrl} alt="your product" />
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
