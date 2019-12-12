import React from "react";
import { Form, Button } from "react-bootstrap";

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
      <Button
        className="button"
        onClick={() => handleAscendingPriceSort(posts)}
      >
        Sort Price Ascending
      </Button>
      <Button
        className="button"
        onClick={() => {
          handleDescendingPriceSort(posts);
        }}
      >
        Sort Price Descending
      </Button>
      <Button className="button" onClick={() => handleRatingSort(posts)}>
        Sort by Rating
      </Button>
      <Button className="button" onClick={() => handleReviewSort(posts)}>
        Sort by Number of Reviews
      </Button>
    </div>
  );
};

export default Filtering;
