import React, { Component } from "react";
import GResource from "./GResource";
import axios from "axios";
import Test from "../components/Test";

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

  // deleteListItem = () => {
  //   const id = this.state.project._id;
  //   axios
  //     .delete(`/api/projects/${id}`)
  //     .then(response => {
  //       // redirect to '/projects'
  //       console.log(this.props.history);
  //       this.props.history.push("/projects"); // `/projects` is our client side route
  //       // this.props.history comes from react-router-dom <Route>
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  handleSubmit = e => {
    e.preventDefault();

    //   if (this.state.uploadOn) return; // do nothing if the file is still being uploaded

    //   saveNewThing(this.state)
    //     .then(res => {
    //       console.log("added: ", res);
    //       // here you would redirect to some other page
    //       console.log("doneee");
    //       this.props.history.push(`/search/${res._id}`);
    //     })
    //     .catch(err => {
    //       console.log("Error while adding the thing: ", err);
    //     });
  };

  render() {
    const { labels, textResults, webResults, imageUrl } = this.state;
    let fullMerge = labels.concat(webResults);

    let str;
    if (textResults) {
      str = textResults;
    } else {
      str = "";
    }
    let strArr = str.split(" ");

    let array = [];
    for (var key in fullMerge) {
      var value = fullMerge[key];
      array.push(value);
    }
    let finalArr = [...array, ...strArr];

    function uniqBy(a, key) {
      var seen = {};
      return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      });
    }

    let newArr = uniqBy(finalArr, JSON.stringify).filter(keyword => {
      return keyword !== "";
    });
    console.log(newArr);

    return (
      <div className="Container">
        <div className="FormKeyWords">
          <form onSubmit={e => this.handleSubmit(e)}>
            {this.state.imageUrl && (
              <React.Fragment>
                <ul>
                  {newArr.map((keyword, index) => {
                    return (
                      <li key={index}>
                        {Object.values(keyword)}
                        {/* <GResource keyword="" /> */}
                        {/* <Link to="googleApiRoute/keywords">keyword</Link>
                    <button type="submit">Remove</button> */}
                      </li>
                    );
                  })}
                </ul>
                <img
                  src={imageUrl}
                  alt="your product"
                  style={{ height: "200px" }}
                />
                <button type="submit">Search Amazon</button>
              </React.Fragment>
            )}
          </form>
          <div>
            {/* <div className="wrap">
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
            </div> */}
            {/* <div className="InputAdd">input/add</div> */}
          </div>
          {/* <div className="ImageEl">
            <img src={this.state.googleImage} />
          </div> */}
        </div>
      </div>
      <div>
        <Test data = {this.newArr}/>
      </div>
    );
  }
}

export default GRForms;
