import React, { Component } from "react";
import axios from "axios";


class Test extends Component {
  state = {
    posts: [],
    err: ""
  };

  componentDidMount() {
    axios
      .post(
        "https://api.zinc.io/v1/search?query=nike air&page=1&retailer=amazon",
        {
          username: { dotenv.ZINC_USERNAME }  // I know that this is wrong, and now I think I understand why this needs to be in the backend
        }
      )
      .then(res => {
        console.log("data from axios", res);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ err: "Errror retrieving data" });
      });
  }

  render() {
    const { posts, err } = this.state;
    return (
      <div>
        List of Products
        {posts.length
          ? posts.map(post => <div key={post.product_id}>{post.title}</div>)
          : null}
        {err ? <div>{err}</div> : null}
        {/* <button onClick={getData}>Get my data</button> */}
      </div>
    );
  }
}

export default Test;
