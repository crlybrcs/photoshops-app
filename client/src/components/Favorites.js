import React, { Component } from "react";
import Product from "../components/Product";

class Favorites extends Component {
  state = {
    favorites: [],
    uploadOn: false
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.state.uploadOn && <h3>Loading...</h3>}

        {posts.length ? (
          posts.map(post => {
            return <Product />;
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Favorites;
