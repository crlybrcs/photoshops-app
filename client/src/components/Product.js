import React from "react";
import StarYellow from "../images/starYellow.png";
import StarBlack from "../images/starBlack.png";

const Product = props => {
  const { post, clickHandle, user, favorites, url } = props;
  console.log(props);
  return (
    <>
      <div key={post.product_id}>
        <div onClick={() => clickHandle(post)}>
          {user ? (
            favorites.includes(post.product_id) === false ? (
              <img src={StarBlack} />
            ) : (
              <img src={StarYellow} />
            )
          ) : null}
        </div>
        <a href={url + post.product_id} target="_blank">
          <img src={post.image} alt="product pic" />
          <h1>{post.title}</h1>
        </a>
      </div>
      <div>
        --- ${Number(post.price / 100).toFixed(2)} --- Star Rating: {post.stars}{" "}
        --- Number of Reviews: {post.num_reviews} ---
        {post.product_id} ---
      </div>
    </>
  );
};

export default Product;
