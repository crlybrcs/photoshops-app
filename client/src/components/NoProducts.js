import React from "react";

const NoProducts = props => {
  const { err, onSubmit } = props;

  const goBack = () => {
    console.log("clicked");
    props.history.push("/");
  };
  console.log(props);
  return (
    <div>
      {!err ? (
        <h3>Loading....</h3>
      ) : (
        <>
          <br />
          {err}
          <br />
          <button
            onClick={() => {
              goBack();
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
