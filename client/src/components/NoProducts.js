import React from "react";

const NoProducts = props => {
  const { err, onSubmit } = props;
  return (
    <div>
      {!err ? (
        <h3>Loading....</h3>
      ) : (
        <>
          <br />
          {err} <br />{" "}
          <button
            onClick={() => {
              props.history.push("/");
            }}
          >
            Return to Keywords
          </button>
        </>
      )}
    </div>
  );
};

export default NoProducts;
