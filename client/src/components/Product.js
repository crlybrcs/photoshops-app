import React from "react";
import StarYellow from "../images/starYellow.png";
import StarBlack from "../images/starBlack.png";

const Product = props => {
  const { post, clickHandle, user, favorites } = props;
  console.log(props.relevant);

  const ternaryFromKyle = (
    <>
      {user ? (
        favorites.includes(post.product_id) === false ? (
          <img className="product-star" src={StarBlack} />
        ) : (
          <img className="product-star" src={StarYellow} />
        )
      ) : null}
    </>
  );

  const alreadyFavorite = (
    <>
      <img className="product-star" src={StarYellow} />
    </>
  );
  console.log(favorites.includes(post.product_id));
  return (
    <div className="product" key={post.product_id}>
      {/* <a href={url + post.product_id} target="_blank"> */}
      {/* <div onClick={() => clickHandle(post)}>{ternaryFromKyle}</div> */}
      <div onClick={() => clickHandle(post)}>
        {props.relevant ? alreadyFavorite : ternaryFromKyle}
      </div>
      <div className="imageWrapper">
        <a href={`https://amazon.com${post.product_id}`}>
          <img className="product-pic" src={post.image} alt="product pic" />
        </a>
      </div>
      <div className="productInfoWrapper">
        <a href={`https://amazon.com${post.product_id}`}>
          <h5>{post.title}</h5>
        </a>
        <p>${Number(post.price / 100).toFixed(2)}</p>
        <p>Star Rating: {post.stars}</p>{" "}
        <p>
          {" "}
          Number of Reviews:
          {post.num_reviews}
        </p>
        {/* ---
          {post.product_id} --- */}
      </div>
    </div>
  );
};

export default Product;
