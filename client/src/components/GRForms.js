import React, { Component } from "react";
// import GResource from "./GResource";
import axios from "axios";
import Test from "../components/Test";
import { Form, Button } from "react-bootstrap";

class GRForms extends Component {
  //pass array here!!!!
  state = {
    labels: [],
    textResults: "",
    webResults: [],
    imageUrl: "",
    cleanData: [],
    newKeyword: "",
    submit: false
  };

  resetSubmit = () => {
    this.setState({ submit: false });
  };

  getData = () => {
    const { id } = this.props.match.params;

    axios
      .get(
        `/googleApi/search/${id}`
        // .get(`${process.env.REACT_APP_API_URL}/googleApi/search/${id}`, {
      )
      .then(response => {
        this.setState(
          {
            labels: response.data.labels,
            textResults: response.data.textResults,
            webResults: response.data.webResults,
            imageUrl: response.data.imageUrl
          },
          () => this.cleaData()
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  cleaData = () => {
    const { labels, textResults, webResults } = this.state;

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

    this.setState({ cleanData: newArr }, () => console.log(newArr));
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ submit: true });
    console.log(this.cleaData);
  };

  handleDelete = (keyword, index) => {
    let cleanData = [...this.state.cleanData];
    cleanData.splice(index, 1);
    this.setState({ cleanData: cleanData });
  };

  handleChange = event => {
    this.setState({
      newKeyword: event.target.value
    });
  };

  handleAdd = event => {
    this.setState(prevState => ({
      cleanData: [...prevState.cleanData, `${this.state.newKeyword}`],
      newKeyword: ""
    }));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { imageUrl, cleanData, submit } = this.state;

    {
      return !submit ? (
        <div className="Container">
          <div className="FormKeyWords">
            <Form onSubmit={this.handleSubmit}>
              {imageUrl && (
                <React.Fragment>
                  <ul>
                    {this.state.cleanData.map((keyword, index) => {
                      return (
                        <>
                          <li key={index}>
                            {Object.values(keyword)}
                            <Button
                              className="delete-button"
                              variant="danger"
                              onClick={e => {
                                e.preventDefault();
                                this.handleDelete(keyword, index);
                              }}
                            >
                              Delete
                            </Button>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                  <input
                    type="text"
                    name="newKeyword"
                    id="newKeyword"
                    value={this.state.newKeyword}
                    onChange={this.handleChange}
                  ></input>
                  <Button
                    type="submit"
                    onClick={e => {
                      e.preventDefault();
                      this.handleAdd(cleanData);
                    }}
                  >
                    ADD
                  </Button>
                  <button type="submit">Search Amazon</button>
                </React.Fragment>
              )}
            </Form>
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
      ) : (
        <div>
          <Test resetSubmit={this.resetSubmit} data={cleanData} />
        </div>
      );
    }
  }
}

export default GRForms;
