import React from "react";

const Filtering = props => {
  const {
    posts,
    handleAscendingPriceSort,
    handleDescendingPriceSort,
    handleRatingSort,
    handleReviewSort
  } = props;
  return (
    <div>
      List of Products
      <button onClick={() => handleAscendingPriceSort(posts)}>
        Sort Price Ascending
      </button>
      <button
        onClick={() => {
          handleDescendingPriceSort(posts);
        }}
      >
        Sort Price Descending
      </button>
      <button onClick={() => handleRatingSort(posts)}>Sort by Rating</button>
      <button onClick={() => handleReviewSort(posts)}>
        Sort by Number of Reviews
      </button>
    </div>
  );
};

export default Filtering;
