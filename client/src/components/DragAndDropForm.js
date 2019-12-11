import React, { Component } from "react";
import axios from "axios";

class DragAndDropForm extends Component {
  state = {
    imageUrl: "",
    labels: [],
    textResults: [],
    webResults: [],
    loading: true
  };

  getData = () => {
    const { id } = this.props.match.params;

    // passing an id to googleApiRoute
    // axios.get(`${process.env.REACT_APP_API_URL}/googleApi/search/${id}`, { withCredentials: true }).then((res) => {
    axios.get(`/googleApi/search/${id}`).then(res => {
      // console.log("axios.get, then(res) -> res.data", res.data);
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
          // console.log("this.state from DRAG AND DROP", this.state);
        }
      );
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    return <div>{this.state.loading && <h2>Loading ....</h2>}</div>;
  }
}

export default DragAndDropForm;
