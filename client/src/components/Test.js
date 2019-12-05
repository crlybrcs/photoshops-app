import React, { Component } from "react";
import axios from "axios";
// import { keywords } from "/routes/products.js";

class Test extends Component {
  state = {
    posts: [],
    err: "",
    keywords: "under armour black shoes"
  };

  componentDidMount = () => {
    console.log("component mounting");
    const keywords = this.state.keywords;
    axios
      .post("/products/test", { keywords })
      .then(res => {
        console.log("test", res.data.results);
        const posts = res.data.results.map(el => {
          const newObj = {};
          newObj.title = el.title;
          newObj.image = el.image;
          newObj.price = el.price;
          newObj.num_reviews = el.num_reviews;
          newObj.stars = el.stars;
          newObj.product_id = el.product_id;
          return newObj;
        });
        this.setState({ posts: posts });
        console.log(posts);
        // console.log(res.data.results[0].image);
        // this.setState({ keywords: "betty crocker spatula red" });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  // insertDecimal = num => {
  //   return Number((num / 100).toFixed(2));
  // };

  // decPrice = insertDecimal(post.price);

  render() {
    const { posts, err } = this.state;
    return (
      <div>
        List of Products
        {posts.length
          ? posts.map(post => (
              <div key={post.product_id}>
                <img src={post.image} alt="product pic" />
                {post.title} --- ${post.price} --- Star Rating: {post.stars} ---
                Number of Reviews: {post.num_reviews} ---
                {post.product_id} ---
              </div>
            ))
          : null}
        {err ? <div>{err}</div> : null}
        {/* <button onClick={getData}>Get my data</button> */}
      </div>
    );
  }
}

export default Test;
