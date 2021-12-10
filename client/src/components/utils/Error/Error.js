import React from "react";

function Error(props) {
  const message = props.message || "Something went wrong. Please try again.";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        fontWeight: "bold",
        fontSize: "1.1rem"
      }}
    >
      {message}
    </div>
  );
}

export default Error;
