import React, { Component } from "react";
import axios from "axios";

class GRForms extends Component {
  // state = {
  //   posts: [],
  //   err: "",
  //   keywords: ""
  // };

  // componentDidMount = () => {
  //   console.log("FORM component mounting");
  //   const keywords = this.state.keywords;
  //   axios.post("/googleApiRoute/grforms", { keywords })
  //   .then(res => {
  //     console.log(res.data);
  //   });
  // };

  // const GRForms = props => {
  //pass array here!!!!
  /*
      let keywordArray = array.map(keyword=>{
        return(
          <li>
            <Link to = "googleData/keyword"> 
            keyword
            </Link>
          </li>
        )
      })
      
      What do we want here?
      keywordArray = keywordArray.slice(0, 15)
      */
  render() {
    return (
      <div className="Container">
        <div className="FormKeyWords">
          <ul>{/*
                  {keywordArray}
                  */}</ul>
          <div>
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
        </div>
      </div>
    );
  }
  // };
}

export default GRForms;
