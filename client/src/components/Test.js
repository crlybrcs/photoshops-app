import React, { Component } from "react";
import axios from "axios";

class Test extends Component {
  state = {
    posts: [],
    err: "",
    keywords: this.props.data
  };

  componentDidMount = () => {
    console.log("component mounting");

    const keywords = this.state.keywords;

    axios
      .post("/products/test", { keywords })
      .then(res => {
        console.log(res);
        const posts = res.data.results
          .map(el => {
            const newObj = {};
            newObj.title = el.title;
            newObj.image = el.image;
            newObj.price = el.price;
            newObj.num_reviews = el.num_reviews;
            newObj.stars = el.stars;
            newObj.product_id = el.product_id;
            return newObj;
          })
          .flat();
        this.setState({ posts: posts });
        console.log(posts);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  handleAscendingPriceSort = event => {
    let priceSort = event.sort((a, b) => {
      console.log("PRICES:", a.price, b.price);
      return (a.price || 0) - (b.price || 0);
    });
    console.log(priceSort);
    this.setState({
      posts: priceSort
    });
  };

  handleDescendingPriceSort = event => {
    let priceSort = event.sort((a, b) => {
      console.log("PRICES:", a.price, b.price);
      return (b.price || 0) - (a.price || 0);
    });
    console.log(priceSort);
    this.setState({
      posts: priceSort
    });
  };

  handleRatingSort = event => {
    let starsSort = event.sort((a, b) => {
      console.log("PRICES:", a.stars, b.stars);
      return (b.stars || 0) - (a.stars || 0);
    });
    console.log(starsSort);
    this.setState({
      posts: starsSort
    });
  };

  handleReviewSort = event => {
    let reviewSort = event.sort((a, b) => {
      console.log("PRICES:", a.num_reviews, b.num_reviews);
      return (b.num_reviews || 0) - (a.num_reviews || 0);
    });
    console.log(reviewSort);
    this.setState({
      posts: reviewSort
    });
  };

  render() {
    const { posts, err } = this.state;

    const prodName = posts.title && posts.title.split(" ").join("-");
    const amz = "http://amazon.com";

    const url = `${amz}/${prodName}/dp/`;
    return (
      <div className="test-page-container">
        List of Products
        <button
          onClick={e => {
            this.handleAscendingPriceSort(posts);
          }}
        >
          Sort Ascending
        </button>
        <button
          onClick={e => {
            this.handleDescendingPriceSort(posts);
          }}
        >
          Sort Descending
        </button>
        <button
          onClick={e => {
            this.handleRatingSort(posts);
          }}
        >
          Sort by Rating
        </button>
        <button
          onClick={e => {
            this.handleReviewSort(posts);
          }}
        >
          Sort by Number of Reviews
        </button>
        {posts.length
          ? posts.map(post => (
              <div key={post.product_id}>
                <a href={url + post.product_id} target="_blank">
                  <div>
                    <img src={post.image} alt="product pic" />
                    <h1>{post.title}</h1>
                  </div>
                </a>
                --- ${post.price / 100} --- Star Rating: {post.stars} --- Number
                of Reviews: {post.num_reviews} ---
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
