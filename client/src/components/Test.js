import React, { Component } from "react";
import axios from "axios";
import Product from "../components/Product";
import Filtering from "../components/Filtering";
import NoProducts from "../components/NoProducts";

class Test extends Component {
  state = {
    posts: [],
    keywords: this.props.data,
    uploadOn: false,
    err: "",
    favorites: []
  };

  componentDidMount = () => {
    console.log("component mounting");

    const keywords = this.state.keywords;

    axios
      .post("/products/test/new", { keywords })
      .then(res => {
        console.log(res);
        // const posts = res.data.results
        const posts = res.data
          .map(el => {
            const newObj = {};
            newObj.title = el.title;
            newObj.image = el.image;
            newObj.price = el.price;
            newObj.num_reviews = el.num_reviews;
            newObj.stars = el.stars;
            newObj.product_id = el.product_id;
            // newObj.title = "Super Swell Water Bottle";
            // newObj.image = "../images/Swell.jpg";
            // newObj.price = "49.99";
            // newObj.num_reviews = "2000";
            // newObj.stars = "5.0";
            // newObj.product_id = "BNNKESRNGPSEKN";
            return newObj;
          })
          .flat();
        if (posts.length) {
          this.setState({ posts: posts, uploadOn: false });
        } else {
          this.setState({
            posts: posts,
            uploadOn: false,
            err: "Please narrow your search"
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  handleAscendingPriceSort = event => {
    console.log(event);
    let priceSort = event.sort((a, b) => {
      console.log("PRICES:", a.price, b.price);
      return (
        (parseFloat(a.price.slice(1)) || 0) -
        (parseFloat(b.price.slice(1)) || 0)
      );
    });
    console.log(priceSort);
    this.setState({
      posts: priceSort
    });
  };

  handleDescendingPriceSort = event => {
    let priceSort = event.sort((a, b) => {
      console.log("PRICES:", a.price, b.price);
      return (
        (parseFloat(b.price.slice(1)) || 0) -
        (parseFloat(a.price.slice(1)) || 0)
      );
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

  onSubmit = () => {
    this.props.resetSubmit();
  };

  clickHandle = post => {
    const product = post.product_id;
    console.log(post);
    // REMOVE PRODUCT FROM FAVORITES
    // IF -> IF PRODUCT IS ALREADY IN THE FAVORITES
    if (this.state.favorites.includes(product)) {
      const shallow = [...this.state.favorites];
      const indexOfProduct = shallow.indexOf(product);
      shallow.splice(indexOfProduct, 1);
      this.setState({ favorites: shallow }, () => {
        // PUT -> REMOVE PRODUCT FROM USER FAVORITES ARRAY AND DELETE ALLTOGETHER
        axios.put(`/products/favorite`, post).then(response => {
          console.log(response);
        });
      });
      // ADD PRODUCT TO FAVORITES
      // ELSE -> PRODUCT TO BE ADDED
    } else {
      this.setState({ favorites: [...this.state.favorites, product] }, () => {
        // console.log(this.state.favorites);
        //POST -> CREATING A PRODUCT
        axios.post("/products/favorite", post).then(response => {
          console.log(response);
        });
      });
    }
  };

  render() {
    const { posts, err, keywords, favorites } = this.state;
    const prodName = posts.title && posts.title.split(" ").join("-");
    const amz = "http://amazon.com";
    const url = `${amz}/${prodName}/dp/`;
    console.log("HEEEEEE", this.props);
    return (
      <div className="test-page-container">
        <Filtering
          handleAscendingPriceSort={this.handleAscendingPriceSort}
          handleDescendingPriceSort={this.handleDescendingPriceSort}
          handleRatingSort={this.handleRatingSort}
          handleReviewSort={this.handleReviewSort}
          posts={this.state.posts}
        />

        {this.state.uploadOn && <h3>Loading...</h3>}
        <div className="product-container">
          {posts.length ? (
            posts.map(post => {
              return (
                <Product
                  user={this.props.user}
                  post={post}
                  clickHandle={this.clickHandle}
                  favorites={this.state.favorites}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>

        <NoProducts
          {...this.props}
          onSubmit={this.onSubmit}
          err={this.state.err}
        />
      </div>
    );
  }
}

export default Test;
