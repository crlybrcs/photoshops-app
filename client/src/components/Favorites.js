import React, { Component } from "react";
import Product from "../components/Product";
import axios from "axios";

class Favorites extends Component {
  state = { favorites: null };

  getData = () => {
    axios.get("/products/myfavorites").then(response => {
      console.log(response);
      this.props.setUser(response.data);
      this.setState({ favorites: response.data.products }, () => {
        console.log("LOOOOOOK ", this.state);
      });
    });
  };

  componentDidMount = () => {
    this.getData();
  };

  clickHandle = post => {
    console.log(post);
    const product = post.product_id;
    const favorites = this.state.favorites.map(el => el.product_id);
    console.log(favorites);
    console.log(product, favorites);
    if (favorites.includes(product)) {
      console.log("Already there");
      const shallow = [...favorites];
      const indexOfProduct = shallow.indexOf(product);
      shallow.splice(indexOfProduct, 1);
      this.setState({ favorites: shallow }, () => {
        // PUT -> REMOVE PRODUCT FROM USER FAVORITES ARRAY AND DELETE ALLTOGETHER
        axios.put(`/products/favorite`, post).then(response => {
          console.log("LOOOOOOOOK", response);
          this.getData();
        });
      });
      // ADD PRODUCT TO FAVORITES
      // ELSE -> PRODUCT TO BE ADDED
    }
  };

  // clickHandle = post => {
  //   const product = post.product_id;
  //   console.log(post);
  //   // REMOVE PRODUCT FROM FAVORITES
  //   // IF -> IF PRODUCT IS ALREADY IN THE FAVORITES
  //   if (this.state.favorites.includes(product)) {
  //     const shallow = [...this.state.favorites];
  //     const indexOfProduct = shallow.indexOf(product);
  //     shallow.splice(indexOfProduct, 1);
  //     this.setState({ favorites: shallow }, () => {
  //       // PUT -> REMOVE PRODUCT FROM USER FAVORITES ARRAY AND DELETE ALLTOGETHER
  //       axios.put(`/products/favorite`, post).then(response => {
  //         console.log(response);
  //       });
  //     });
  //     // ADD PRODUCT TO FAVORITES
  //     // ELSE -> PRODUCT TO BE ADDED
  //   } else {
  //     this.setState({ favorites: [...this.state.favorites, product] }, () => {
  //       // console.log(this.state.favorites);
  //       //POST -> CREATING A PRODUCT
  //       axios.post("/products/favorite", post).then(response => {
  //         console.log(response);
  //       });
  //     });
  //   }
  // };

  render() {
    // const { products } = this.props.user;
    // console.log(typeof products[products.length - 1].price);
    // return <div>Hi</div>;
    const { products } = this.props.user;
    return (
      <div className="product-container">
        {/* {this.props.user.products.length && <h3>Loading...</h3>} */}
        {products.length ? (
          products.map(post => {
            {
              /* console.log(post); */
            }
            return (
              <Product
                user={this.props.user}
                post={post}
                clickHandle={this.clickHandle}
                favorites={products}
                relevant={true}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Favorites;
